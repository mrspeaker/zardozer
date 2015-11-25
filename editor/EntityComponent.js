import React from "react";
import Input from "./Input";

const {
  Component
} = React;

class EntityComponent extends Component {

  constructor () {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick () {
  }

  render () {
    const {component} = this.props;
    const {propTypes} = component.constructor;

    let propertiesDef = [];
    if (propTypes) {
      for (let v in propTypes) {
        propertiesDef.push([v, propTypes[v]]);
      }
    }

    const makeInput = (field, type, val) => {
      switch (type) {
      case "Boolean":
        return <input type="checkbox" checked={val} onChange={() => component[field] = !component[field]} />
        break;
      case "Instance":
        return <Input value={val.name} onChange={v => {}} />
      default:
        return <Input value={val} onChange={v => {
          const newVal = type === "Number" ? parseFloat(v, 10) :  v;
          component[field] = newVal;
        }} />
      }
    }

    const hasEnabled = propertiesDef.find(p => p[0] === "enabled");
    let enabledBox = null;
    if (hasEnabled) {
      enabledBox = makeInput(hasEnabled[0], hasEnabled[1], component[hasEnabled[0]]);
      propertiesDef = propertiesDef.filter(p => p !== hasEnabled);
    }

    const properties = propertiesDef.map((d, i) => {
      return <div key={i}>{d[0]}: {makeInput(d[0], d[1], component[d[0]])}</div>;
    })

    return <div onClick={this.onClick}>
      <strong>{enabledBox}{component.name}</strong>
      <div style={{paddingLeft:"5px"}}>
        {properties}
      </div>
    </div>;
  }
}

export default EntityComponent;
