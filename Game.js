import Mouse from "./controls/Mouse";
import Keys from "./controls/Keys";
import Entities from "./entities/Entities";
import Entity from "./entities/Entity";
import Env from "./Env";
import GameData from "./game/scene1";

let id = 1;

export default class {

  _doReset = false;
  _reloadOnReset = true;

  // TODO: was adding gamedata as param instead of import...
  constructor (container, gameData) {
    this.entities = [];
    this._starts = [];
    this._nextStarts = [];
    this._entitiesToAdd = [];
    this.container = container;
    this.gameData = gameData;
    Env.game = this;
  }

  init () {
    this.bindEvents();

    // Test serializing an in-game entity
    requestAnimationFrame(() => {
      const serialized = Entities.serialize(this.entities[0]);
      //console.log(JSON.stringify(serialized, null, 2));
    });

    this.tick = this.tick.bind(this);

    this._reset();
    //this.loadScene();

    Keys.init();
    Mouse.init();
    Env.game.container.focus();
  }

  reset (reload = true) {
    this._doReset = true;
    this._reloadOnReset = reload;
  }
  _reset () {
    this.entities = this.entities.filter(e => {
      e.components = e.components.filter(c => {
        e.removeComponent(c);
        return false;
      });
      return false;
    });
    this._starts = [];
    this._nextStarts = [];
    this.last = 0;
    id = 1;

    if (this._reloadOnReset) {
      this.loadScene();
    }
  }

  bindEvents() {
    Env.events.on("AddEntity", (e) => {
      console.log("will add", e)
    })
  }

  loadScene () {
    GameData.entities
      .map(data => Entities.make(data))
      .map(e => this.addEntity(e));
  }

  getPrefabByName (name) {
    const data = GameData.entities.find(e => e.name === name);
    const entity = Entities.make(data);
    return entity;
  }

  addPrefabByName (name) {
    return this.addEntity(this.getPrefabByName(name));
  }

  start () {
    requestAnimationFrame(this.tick);
  }

  tick (time) {
    const dt = this.last ? time - this.last : 1000 / 60;
    this.last = time;

    this.update(dt);

    requestAnimationFrame(this.tick);
  }

  update (dt) {
    dt /= 1000; // Let's work in seconds.

    // Do any adds
    this._entitiesToAdd = this._entitiesToAdd.filter(e => {
      this.entities.push(e);
      return false;
    });

    this._starts = this._nextStarts.slice();
    this._nextStarts = [];

    // Do any component start functions.
    this._starts = this._starts.filter(f => {
      f();
      return false;
    });

    this.entities.forEach(e => {
      e.components.forEach(c => {
        c.update(dt);
      });
    });

    // TODO: smarter collisions, move outta here.
    // Naive collisions... check everything, tell everyone.
    for (let i = 0; i < this.entities.length - 1; i++) {
      const a = this.entities[i];
      const aPos = a.getComponent("Position");
      for (let j = i + 1; j < this.entities.length; j++) {
        const b = this.entities[j];
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

    this.post(dt);

  }

  post (dt) {
    Keys.update(dt);
    Mouse.update(dt);

    // Do any removal
    this.entities = this.entities.filter(e => {
      if (!e.remove) {
        return true;
      }
      // Remove the components
      e.components = e.components.filter(c => {
        e.removeComponent(c);
        return false;
      });
      return false;
    });

    if (this._doReset) {
      this._reset();
      this._doReset = false;
    }
  }

  renderOnlyUpdate () {
    // Just visual refresh, for editor.

    // Do any adds
    this._entitiesToAdd = this._entitiesToAdd.filter(e => {
      this.entities.push(e);
      return false;
    });

    this._starts = this._nextStarts.slice();
    this._nextStarts = [];

    // Do any component start functions.
    this._starts = this._starts.filter(f => {
      f();
      return false;
    });

    // Don't know a nice way to do this... mark render-only components somehow?
    this.entities.forEach(e => {
      e.components.forEach(c => {
        if (c.name.indexOf("enderer") > -1) {
          c.update(0);
        }
      });
    });

    this.post(0);
  }

  addStart (f) {
    this._nextStarts.push(f);
  }

  spawn (e, x, y) {
    const ent = this.addEntity(Entities.instanciate(e));
    if (x !== null) {
      const pos = ent.getComponent("Position");
      pos.x = x;
      pos.y = y;
    }
    return ent;
  }

  addEntity (e) {
    if (!e.id) {
      e.id = id++;
    }
    const sameName = this.entities.find(e2 => e2.name === e.name);
    if (sameName) {
      e.name += "-" + e.id;
    }
    this._entitiesToAdd.push(e);
    return e;
  }

  addBlankEntity () {
    // Should use helper method / data style. Always force this?
    const e = new Entity("entity", 50, 50, 69, 71, 5);
    Entities.addComponent(e, ["Renderer", "", "p3_duck.png"]);
    return this.addEntity(e);
  }

  removeEntity (entity) {
    entity.remove = true;
  }

  getEntityByName (name) {
    return this.entities.find(e => e.name === name);
  }

}
