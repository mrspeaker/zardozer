import Entity from "./Entity";
import components from "../components/";

const make = (data, needsSerializing = false) => {
  const EntityFunc = Function.prototype.bind.call(Entity, null, data.name, ...data.pos);
  const entity = new EntityFunc();
  entity.prefab = data;
  if (needsSerializing) {
    entity.serialize = true;
    if (data.prefab) {
      entity.isPrefab = true;
    }
  }
  data.comps.forEach(c => addComponent(entity, c));

  // Add any children
  if (data.children) {
    entity.children = data.children.map(c => {
      return make(c, needsSerializing);
    });
  }

  return entity;
};

const addComponent = (e, comp) => {
  const CompFunc = Function.prototype.bind.call(components[comp[0]], null, ...comp.slice(1));
  e.addComponent(new CompFunc());
};

const serialize = (e) => {
  const {name, components, isPrefab} = e;
  const pos = e.getComponent("Position");
  const {x, y, w, h, z} = pos;
  const comps = components
    .filter(c => c.name !== "Position")
    .map(serializeComponent);

  return {
    name,
    prefab: isPrefab,
    pos: [x, y, w, h, z],
    comps
  };
};

const serializeComponent = (c) => {
  const {name} = c;
  const {propTypes} = c.constructor;
  const res = [name];
  for (let val in propTypes) {
    if (val === "enabled") { continue; }
    const type = propTypes[val];
    if (type === "Instance") {
      res.push(c[val].name);
    } else {
      // HACK! just handle's gridit case of array of instances... recurse this!
      if (typeof c[val] === "object") {
        res.push(c[val].map(v => v.name));
      } else {
        res.push(c[val]);
      }
    }
  }
  return res;
};

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
};
