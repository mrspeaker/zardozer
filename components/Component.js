import Entity from "../entities/Entity";

class Component {

  static propTypes = {};
  static deps = []; // Meta deps for checking other comps exist

  constructor () {
    this.name = this.constructor.name; // hmm, probably can avoid this.
    this.deps = {};
    this.entity = null;
  }

  start () {
    const {constructor} = this;
    constructor.deps.forEach(d => {
      this.deps[d] = this.getComponent(d);
    });

    // Fetch `Instance`s automatically
    for (let v in constructor.propTypes) {
      if (constructor.propTypes[v] === "Instance") {
        this.updatePrefab(v, this[v]);
      }
    }
  }

  update () {}

  remove () {}

  onCollision () {}

  updatePrefab (fieldName, entityName) {
    const e = Entity.find(entityName);
    this[fieldName] = e;
  }

  // Helper for getting other components on entity
  getComponent (name) {
    return !this.entity ? null : this.entity.getComponent(name);
  }

}

export default Component;
