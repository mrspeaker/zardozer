import GameData from "./GameData";
import Mouse from "./controls/Mouse";
import Entities from "./entities/Entities";
import Env from "./Env";

export default class {

  constructor (container) {
    this.entities = [];
    this._starts = [];
    this.container = container;
    Env.game = this;
  }

  init () {
    this.loadScene();

    this.last = 0;
    this.tick = this.tick.bind(this);

    this.bindEvents();

    requestAnimationFrame(this.tick);

    // Test serializing an in-game entity
    requestAnimationFrame(() => {
      const serialized = Entities.serialize(this.entities[0]);
      console.log(JSON.stringify(serialized, null, 2));
      Entities.addComponent(this.entities[0], ["ColorUp", 1]);
    });

    Mouse.init();

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

  tick (time) {
    const dt = this.last ? time - this.last : 1000 / 60;
    this.last = time;

    this.update(dt);
    this.post(dt);

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

  }

  post (dt) {
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
  }

  spawn (e) {
    return this.addEntity(Entities.instanciate(e));
  }

  addStart (f) {
    this._starts.push(f);
  }

  addEntity (e) {
    this.entities.push(e);
    return e;
  }

  removeEntity (entity) {
    entity.remove = true;
  }

  getEntityByName (name) {
    return this.entities.find(e => e.name === name);
  }

}
