import GameData from "./GameData";
import Mouse from "./controls/Mouse";
import Keys from "./controls/Keys";
import Entities from "./entities/Entities";
import Entity from "./entities/Entity";
import Env from "./Env";

let id = 1;

export default class {

  _doReset = false;

  constructor (container) {
    this.entities = [];
    this._starts = [];
    this.container = container;
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

  reset () {
    this._doReset = true;
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
    this.last = 0;
    id = 1;
    
    this.loadScene();
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
    const data = GameData.entities.find(e => e.args[0] === name);
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

    // Naive collisions... check everything, tell everyone.
    for (let i = 0; i < this.entities.length - 1; i++) {
      const a = this.entities[i];
      for (let j = i + 1; j < this.entities.length; j++) {
        const b = this.entities[j];
        const aPos = a.getComponent("Position");
        const bPos = b.getComponent("Position");
        const dx = aPos.x - bPos.x;
        const dy = aPos.y - bPos.y;

        if (Math.sqrt(dx * dx + dy * dy) < 12) {
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

  // Game specific... move.
  spawn (e) {
    return this.addEntity(Entities.instanciate(e));
  }

  addStart (f) {
    this._starts.push(f);
  }

  addEntity (e) {
    if (!e.id) {
      e.id = id++;
    }
    this.entities.push(e);
    return e;
  }

  addBlankEntity () {
    const e = new Entity("entity", 50, 50);
    Entities.addComponent(e, ["Renderer", "#800"]);
    return this.addEntity(e);
  }

  removeEntity (entity) {
    entity.remove = true;
  }

  getEntityByName (name) {
    return this.entities.find(e => e.name === name);
  }

}
