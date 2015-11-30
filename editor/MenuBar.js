import React from "react";

const {
  Component
} = React;

class MenuBar extends Component {

  render () {
    const {mode, onTogglePlay, onPausePlay, onAddNewEntity, onNewGame} = this.props;
    const btnText = mode === "EDIT" ? "Play" : "Stop";

    return <header className="header">
      <span>Zardozer v0.01.</span>
      &nbsp;
      <button title="toggle Play/Edit (Enter)" onClick={onTogglePlay}>{btnText}</button>
      &nbsp;
      <button title="Pause during game (p)" onClick={onPausePlay}>Pause</button>
      &nbsp;
      <button title="create new entity at 50,50" onClick={onAddNewEntity}>Add Entity</button>
      &nbsp;
      <button title="create a new game" onClick={onNewGame}>New Game</button>
    </header>;
  }
}

export default MenuBar;
