import React from "react";
import Env from "../Env";

const {
  Component
} = React;

class MenuBar extends Component {

  render () {
    return <header className="header">
      <span>Funkity v0.01.</span>
      &nbsp;
      <button onClick={this.props.onTogglePlay}>{this.props.mode}</button>
      &nbsp;
      <button onClick={this.props.onAdd}>Add Entity</button>
      &nbsp;
      <button onClick={this.props.onNewGame}>New Game</button>
    </header>
  }
}

export default MenuBar;
