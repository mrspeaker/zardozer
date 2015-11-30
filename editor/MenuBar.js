import React from "react";
import Env from "../Env";

const {
  Component
} = React;

class MenuBar extends Component {

  render () {
    return <header className="header">
      <span>Zardozer v0.01.</span>
      &nbsp;
      <button title="toggle Play/Edit (Enter)" onClick={this.props.onTogglePlay}>{this.props.mode}</button>
      {// &nbsp;
      //<button title="Pause during game (p)" onClick={this.props.onPausePlay}>Pause</button>
      }
      &nbsp;
      <button title="create new entity at 50,50" onClick={this.props.onAddNewEntity}>Add Entity</button>
      &nbsp;
      <button title="create a new game" onClick={this.props.onNewGame}>New Game</button>
    </header>;
  }
}

export default MenuBar;
