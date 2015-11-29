import React from "react";
import EntityComponents from "./EntityComponents";
import Entities from "../entities/Entities";
import ComponentAdd from "./ComponentAdd";

const {
  Component
} = React;

class Entity extends Component {

  constructor () {
    super();
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd (compDef) {
    const {entity} = this.props;
    const parsed = eval(compDef);
    if (parsed instanceof Array) {
      Entities.addComponent(entity, parsed);
    }
  }

  render () {
    const {entity} = this.props;
    if (!entity) return null;

    const {components, name, id} = entity;
    return <div>
      <strong>Name:<input type="text" value={name} /></strong>&nbsp;
      <span>({id})</span>
      <hr/>
      <EntityComponents components={components} />
      <hr/>
      <ComponentAdd onAdd={this.onAdd} />
      <br/>
      <button title="Duplicate selected entityt (d)" onClick={this.props.onDuplicate}>Duplicate</button>
    </div>;
  }
}

export default Entity;
