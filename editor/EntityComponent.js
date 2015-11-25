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

    const makeInput = (field, type, val) => {
      switch (type) {
      case "Boolean":
        return <input type="checkbox" defaultChecked={val} onChange={() => component[field] = !component[field]} />
        break;
      case "Instance":
        return <input type="text" value={val.name} onChange={() => {}}/>;
      default:
        return <input type="text" value={val} onChange={() => {}}/>;
      }
    }

    const properties = propertiesDef.map((d, i) => {
      return <div key={i}>{d[0]}: {makeInput(d[0], d[1], component[d[0]])}</div>;
    })

    return <div onClick={this.onClick}>
      {component.name}
      <div style={{paddingLeft:"5px"}}>
        {properties}
      </div>
    </div>;
  }
}

export default EntityComponent;
