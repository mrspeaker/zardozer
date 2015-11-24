class Component {

  constructor () {
    this.name = "Component";
    this.entity = null;
  }
  start () {}
  update () {}
  remove () {}

  // Helper for getting other components on entity
  getComponent (name) {
    if (!this.entity) {
      return null;
    }
    return this.entity.getComponent(name);
  }

}

export default Component;
