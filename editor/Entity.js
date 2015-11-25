import React from "react";
import EntityComponents from "./EntityComponents";

const {
  Component
} = React;

class Entity extends Component {

  constructor () {
    super();
  }

  render () {
    const {entity} = this.props;
    if (!entity) return null;

    const {components, name} = entity;
    return <div>
        <div>{name}</div>
        <hr/>
        <EntityComponents components={components} />
    </div>;
  }
}

export default Entity;
