import Mouse from "./controls/Mouse";
import Keys from "./controls/Keys";
import Entities from "./entities/Entities";
import Entity from "./entities/Entity";
import Env from "./Env";
import State from "./components/State";

import WebGLRenderer from "./systems/WebGLRenderer";
import DebugRenderer from "./systems/DebugRenderer";

window.Env = Env;

class Game {

  _resetGame = false;
  _resetDoesReload = true;

  entities;
  entitiesToAdd;
  componentStarts;
  componentStartsToAdd;
  systems;

  entityId = 1;
  lastTime = 0;

  constructor (container) {
    Env.game = this;

    this.container = container;
    this.entities = [];
    this.running = false;
    this.tick = this.tick.bind(this);

    this.systems = {
      renderer: new WebGLRenderer(800, 350, container),
      debug: new DebugRenderer(800, 350, container)
    };
  }

  init (gameData) {
    this.gameData = gameData;

    this._reset();
    Keys.init();
    Mouse.init();
    Env.game.container.focus();
  }

  reset (reload = true) {
    this._resetGame = true;
    this._resetDoesReload = reload;
  }
  _reset () {
    // Remove all entities and components
    const removeEntities = (ents) => {
      ents.forEach(e => {
        e.components.forEach(c => {
          e.removeComponent(c);
        });
        e.components.length = 0;

        if (e.children) {
          removeEntities(e.children);
        }
      });
      ents.length = 0;
    };

    removeEntities(this.entities);

    this.entitiesToAdd = [];
    this.componentStarts = [];
    this.componentStartsToAdd = [];
    this.lastTime = 0;
    this.entityId = 1;

    if (this._resetDoesReload) {
      this.loadScene(this.gameData);
    }

    this.state = new State("INIT");
  }

  loadScene (data) {
    const { renderer } = this.systems;
    const allAssets = new Map();
    const loadAssets = (ents) => {
      ents.reduce((a, e) => {
        e.comps
          .filter(c => c[0] === "Renderer")
          .filter(i => !!i[2]) // filter out containers
          .map(i => [i[2], i[3]])
          .forEach(([name, path]) => a.set(name, path));
        return a;
      }, allAssets);

      ents
        .map(data => {
          if (data.children) {
            loadAssets(data.children);
          }
        });
    };

    // Load any img assets in the data
    loadAssets(data.entities);
    renderer.loadAssets(allAssets);
    renderer.onLoad(() => {
      renderer.update(0);
    });

    // Make and add entities to the game
    data.entities
      .map(data => Entities.make(data, true))
      .map(e => this.addEntity(e));
  }

  start () {
    this.running = true;
    requestAnimationFrame(this.tick);
  }

  stop () {
    this.running = false;
  }

  tick (time) {
    const dt = this.lastTime ? time - this.lastTime : 1000 / 60;
    this.lastTime = time;

    this.update(dt);

    requestAnimationFrame(this.tick);
  }

  update (dt) {
    dt /= 1000; // Let's work in seconds.

    this.state.update(dt);
    const state = this.state.state;
    switch(state) {
    case "INIT":
      this.state.setState("RUNNING");
      this.updatePost(dt); // TODO: break out key handling!
      break;
    case "LOADING":
      // load level
      this.state.setState("RESET");
      break;
    case "RESET":
      // Reset logic
      this.state.setState("RUNNING");
      break;
    case "EDITING":
      this.updateRenderOnly(dt);
      this.updatePost(dt);
      break;
    case "RUNNING":
      if (this.state.first) {
        //this.renderer.zSort();
      }
      this.updateRunning(dt);
      this.updatePost(dt);
      break;
    default:
      console.error("Bad state:", state);
      break;
    }

    this.systems["renderer"].update(dt);
    this.systems["debug"].update(dt);
  }

  updateRunning (dt) {
    // Add any new entities
    this.entitiesToAdd = this.entitiesToAdd.filter(e => {
      this.entities.push(e);
      return false;
    });

    this.runComponentStarts();

    // Update all entity's components
    this.entities.forEach(e => {
      if (e.isPrefab) { return; }
      e.components.forEach(c => {
        c.update(dt);
      });
    });

    // TODO: nope... update prefabs on toggle.
    if (this.state.frame === 2) {
      this.entities.forEach(e => {
        if (e.isPrefab) {
          // TODO: fix render system to have same api.
          const rend = e.getComponent("DOMRenderer") || e.getComponent("Renderer");
          rend.enabled = false;
          rend.update(0);
        }
      });
    }

    this.checkCollisions();
  }

  // Just visual refresh, for editor.
  updateRenderOnly (dt) {

    // Do any Entity adds
    this.entitiesToAdd = this.entitiesToAdd.filter(e => {
      this.entities.push(e);
      return false;
    });

    this.runComponentStarts();

    // Don't know a nice way to do this... mark render-only components somehow?
    this.entities.forEach(e => {
      e.components.forEach(c => {
        if (c.name.indexOf("Renderer") > -1) {
          c.update(dt);
        }
      });
    });

  }

  updatePost (dt) {
    Keys.update(dt);
    Mouse.update(dt);

    // Do any entity removal & post updates
    this.entities = this.entities.filter(e => {

      if (!e.remove) {
        // Store last frame position for collision purposes.
        const pos = e.getComponent("Position");
        pos.previousX = pos.x;
        pos.previousY = pos.y;

        return true;
      }

      // Remove the components
      e.components = e.components.filter(c => {
        e.removeComponent(c);
        return false;
      });

      return false;
    });

    if (this._resetGame) {
      this._resetGame = false;
      this._reset();
    }
  }

  runComponentStarts () {
    this.componentStarts = this.componentStartsToAdd.slice();
    this.componentStartsToAdd = []; // start functions can add new start functions

    // Execute component Start functions.
    this.componentStarts = this.componentStarts.filter(f => {
      f();
      return false;
    });
  }

  checkCollisions () {
    // TODO: smarter collisions. Collision layers
    for (let i = 0; i < this.entities.length - 1; i++) {
      const a = this.entities[i];
      const aPos = a.getComponent("Position");
      for (let j = i + 1; j < this.entities.length; j++) {
        const b = this.entities[j];
        // HACKKK... prefabs should be compeltely out of system.
        if (a.isPrefab || b.isPrefab) continue;
        const bPos = b.getComponent("Position");
        if (aPos.x + aPos.w >= bPos.x &&
          aPos.x <= bPos.x + bPos.w &&
          aPos.y + aPos.h >= bPos.y &&
          aPos.y <= bPos.y + bPos.h) {
          a.components.forEach(c => {
            c.onCollision(b);
          });
          b.components.forEach(c => {
            c.onCollision(a);
          });
        }
      }
    }
  }

  getEntityByName (name) {
    return Entity.find(name);
  }

  // Called from Entity constructor to push component start functions
  addStartFunction (f) {
    this.componentStartsToAdd.push(f);
  }


  // Move Entity creation functions to Entity static methods

  // todo: parent?
  createPrefabFromName (name) {
    const data = this.gameData.entities.find(e => e.name === name);
    const entity = Entities.make(data);
    return entity;
  }

  // Used in components to create from game data (see KeyShooter -> "bullet")
  // todo: parent?
  addPrefabFromName (name, x, y) {
    const entity = this.createPrefabFromName(name);
    return Entity.position(
      this.addEntity(entity),
      x,
      y);
  }

  // todo: parent?
  addPrefabFromInstance (e, x, y) {
    const entity = Entities.instanciate(e);
    return Entity.position(
      this.addEntity(entity),
      x,
      y);
  }

  // todo: parent?
  addBlankEntity () {
    // Should use helper method / data style. Always force this?
    const e = new Entity("entity", 50, 50, 69, 71, 5);
    Entities.addComponent(e, ["Renderer", "", "p3_duck.png"]);
    return this.addEntity(e);
  }

  // todo: parent?
  addEntity (e) {
    if (!e.id) {
      e.id = this.entityId++;
    }
    const sameName = this.entities.find(e2 => e2.name === e.name);
    if (sameName) {
      e.name += "-" + e.id;
    }
    console.log("adding?", e.id, e.name, e.children.length);
    this.entitiesToAdd.push(e);

    e.children.forEach(c => {
      this.addEntity(c);
    });
    return e;
  }

  removeEntity (entity) {
    entity.remove = true;
  }

}

export default Game;
