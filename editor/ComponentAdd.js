import React from "react";
import components from "../components/";

const {
  Component
} = React;

class ComponentAdd extends Component {

  constructor () {
    super();
    this.state = {
      selected: "",
      hint: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  clearComp () {
    this.setState({
      selected: "",
      hint: ""
    });
    this.refs.componentDef.value = "";
  }

  onChange ({target:{value}}) {
    const comp = components[value];
    const args = ["'" + value + "'"];
    const hint = [];

    if (!comp) {
      this.clearComp();
      return;
    }
    const props = comp.propTypes;
    for (let val in props) {
      const p = props[val];
      if (val === "enabled") {
        // no enable plz
        continue;
      }
      if (p === "Color") {
        args.push(`'#000'`);
      }
      else if (p === "Instance") {
        args.push(`'e1'`);
      }
      else if (p === "Number") {
        args.push(`1`);
      }
      else if (p === "Boolean") {
        args.push(true);
      }
      else args.push(`'${val}'`);

      hint.push(val);
    }

    this.refs.componentDef.value = "[" + args.join(",") + "]";
    this.setState({
      selected:value,
      hint: hint.join(",")
    });
  }

  onAdd () {
    this.props.onAdd(this.refs.componentDef.value);
    this.clearComp();
  }

  render () {
    const comps = [];
    for (var val in components) {
      comps.push(val);
    }
    return <div>
      component: <select onChange={this.onChange} value={this.state.selected}>
        <option value="">--</option>
        {comps.map(c => {
          return <option value={c}>{c}</option>;
        })}
      </select>
      <div>params: {this.state.hint}</div>
      <div style={{clear:"both"}}>
        <input type="text" ref="componentDef" />
        <button onClick={this.onAdd}>add comp</button>
      </div>
    </div>;
  }
}

export default ComponentAdd;
