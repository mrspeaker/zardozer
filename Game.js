import GameData from "./GameData";
import components from "./components/";
import Mouse from './controls/Mouse';
import Entity from './entities/Entity';

export default class {

  constructor () {
    this.entities = [];
    this._starts = [];
  }

  init () {
    this.loadScene();

    this.last = 0;
    this.tick = this.tick.bind(this);
    requestAnimationFrame(this.tick);
  }

  loadScene () {
    GameData.entities
      .map(data => this.makeEntity(data))
      .map(e => this.addEntity(e));
  }

  tick (time) {
    const dt = this.last ? time - this.last : 1000 / 60;
    this.last = time;

    this.update(dt);
    requestAnimationFrame(this.tick);
  }

  makeEntity (data) {
    const EntityFunc = Function.prototype.bind.call(Entity, null, ...data.args);
    const entity = new EntityFunc();
    entity.prefab = data;
    data.comps.forEach(c => {
      const CompFunc = Function.prototype.bind.call(components[c[0]], null, ...c.slice(1));
      entity.addComponent(new CompFunc());
    });
    return entity;
  }

  instanciateAndAdd (e) {
    const newEntity = this.instanciate(e);
    this.addEntity(newEntity);
    return newEntity;
  }

  instanciate (e) {
    return this.makeEntity(e.prefab);
  }

  addEntity (e) {
    this.entities.push(e);
    return e;
  }

  addStart (f) {
    this._starts.push(f);
  }

  update (dt) {
    dt /= 1000;

    // Do any component start functions.
    if (this._starts.length) {
      this._starts = this._starts.filter(f => {
        f();
        return false;
      })
    }

    this.entities.forEach(e => {
      e.components.forEach(c => {
        c.update(dt);
      });
    });
    Mouse.update(dt);


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

  remove (entity) {
    entity.remove = true;
  }

  getEntityByName (name) {
    return this.entities.find(e => e.name === name);
  }

}
