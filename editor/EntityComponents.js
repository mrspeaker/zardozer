import React from "react";
import EntityComponent from "./EntityComponent";

const {
  Component
} = React;

class EntityComponents extends Component {

  constructor () {
    super();
  }

  render () {
    const {components} = this.props;
    if (!components) return null;

    return <div>
      {components.map((c, i) => <EntityComponent key={c.name + ":" + i} component={c}/>)}
    </div>;
  }
}

export default EntityComponents;
