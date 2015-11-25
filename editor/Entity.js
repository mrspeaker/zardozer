import React from "react";
import EntityComponents from "./EntityComponents";
import Entities from "../entities/Entities";

const {
  Component
} = React;

class Entity extends Component {

  constructor () {
    super();
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd () {
    const {entity} = this.props;
    const compDef = this.refs.componentDef.value;
    const parsed = eval(compDef);
    if (parsed instanceof Array) {
      Entities.addComponent(entity, parsed);
    }
  }

  render () {
    const {entity} = this.props;
    if (!entity) return null;

    const {components, name} = entity;
    return <div>
        <strong>{name}</strong>
        <hr/>
        <input type="text" ref="componentDef" defaultValue="['name', 'param1']"/><button onClick={this.onAdd}>add</button>
        <EntityComponents components={components} />
    </div>;
  }
}

export default Entity;
