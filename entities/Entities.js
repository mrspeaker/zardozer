import Entity from "./Entity";
import components from "../components/";

const make = (data) => {
  const EntityFunc = Function.prototype.bind.call(Entity, null, data.name, ...data.pos);
  const entity = new EntityFunc();
  entity.prefab = data;
  data.comps.forEach(c => addComponent(entity, c));
  return entity;
}

const addComponent = (e, comp) => {
  const CompFunc = Function.prototype.bind.call(components[comp[0]], null, ...comp.slice(1));
  e.addComponent(new CompFunc());
};

const serialize = (e) => {
  const {name} = e;
  const {x, y, w, h} = e.getComponent("Position");
  const pos = [x | 0, y | 0, w, h];
  const comps = e.components.reduce((ac, c) => {
    if (c.name === "Position") {
      return ac;
    }
    const comp = [c.name];
    const props = c.constructor.propTypes;
    if (props) {
      for (let p in props) {
        const type = props[p];
        const propVal = type === "Instance" ? c[p].name : c[p];
        comp.push(propVal);
      }
    }
    return [...ac, comp];
  }, []);

  return {name, pos, comps};
}

const instanciate = (e) => {
  if (!e.prefab) {
    // console.log("no prefab");
    // i think this is hack - shouldn't use prefabs - just serialize?
    // oooor, there is two types... prefabs and instances.
    e.prefab = serialize(e);
  }
  return make(e.prefab);
};

export default {
  make,
  serialize,
  addComponent,
  instanciate
}
