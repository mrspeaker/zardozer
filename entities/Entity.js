import Env from "../Env";
import Position from "../components/Position";

class Entity {

  constructor (name, x = 0, y = 0, w = 32, h = 32, z = 5) {
    this.name = name;
    this.components = [];
    this.prefab = {};

    // Adding Position by default... not sure that's a good idea.
    // not all entities need a position (but it could be good for displaying
    // in a game editor)
    this.addComponent(new Position(x, y, w, h, z));

    this.remove = false;
  }

  addComponent (comp) {
    this.components.push(comp);
    comp.entity = this; // Add reference to the component's entity

    // If there are start methods on the comp, add it to be run next tick.
    // this should probably be done by some global marshaller
    // In fact... perhaps Game should hold all components directly - this would
    // allow for optimization for collisions, for example.
    if (comp.start) {
      Env.game.addStartFunction(comp.start.bind(comp));
    }

    return comp;
  }

  removeComponent (comp) {
    comp.remove && comp.remove();
    comp.entity = null;
    this.components = this.components.filter(c => c !== comp);
  }

  getComponent (name) {
    return this.components.find(c => c.name === name);
  }

}

export default Entity;
