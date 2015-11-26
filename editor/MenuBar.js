import React from "react";
import Env from "../Env";

const {
  Component
} = React;

class MenuBar extends Component {

  render () {
    return <header className="header">
      FallIn: test editor
      &nbsp;
      <span onClick={this.props.onTogglePlay}>{this.props.mode}</span>
      &nbsp;
      <span>
        <button onClick={this.props.onAdd}>Add Enitity</button>
      </span>
    </header>
  }
}

export default MenuBar;
