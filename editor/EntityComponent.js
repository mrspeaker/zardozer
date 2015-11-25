import React from "react";

const {
  Component
} = React;

class EntityComponent extends Component {

  constructor () {
    super();
    this.state = {
      propTypes: null
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    if (this.state.propTypes) {
      this.setState({propTypes:null});
      return;
    }
    const {component} = this.props;
    const {propTypes} = component.constructor;

    this.setState({
      propTypes
    });
  }

  render () {
    const {component} = this.props;
    const {propTypes} = this.state;

    const propertiesDef = [];
    if (propTypes) {
      for (let v in propTypes) {
        propertiesDef.push([v, propTypes[v]]);
      }
    }
    const properties = propertiesDef.map(d => {
      return <div>{d[0]}: <input value={component[d[0]]} /></div>;
    })

    return <div onClick={this.onClick}>
      {component.name}
      {properties}
    </div>;
  }
}

export default EntityComponent;
