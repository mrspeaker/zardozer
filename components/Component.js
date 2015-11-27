class Component {

  static propTypes = {};
  static deps = []; // Maybe... meta deps for checking other comps exist

  constructor () {
    this.name = this.constructor.name; // hmm, probably can avoid this.
    this.deps = {};
    this.entity = null;
  }

  start () {
    this.constructor.deps.forEach(d => {
      this.deps[d] = this.getComponent(d);
    });

    // Fetch `Instance`s automatic?
    //this.target = Env.game.getEntityByName(this.target);
  }

  update () {}

  remove () {}

  onCollision () {}

  // Helper for getting other components on entity
  getComponent (name) {
    return !this.entity ? null : this.entity.getComponent(name);
  }

}

export default Component;
