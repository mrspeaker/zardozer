import React from "react";

const {
  Component
} = React;

class MenuBar extends Component {

  constructor () {
    super();
    this.state = {
      selected: "demoGame"
    };
  }

  onLoadGame = () => {
    const {onLoadGame} = this.props;
    const {selected} = this.state;
    onLoadGame(selected);
  }

  onChange = ({target:{value:selected}}) => {
    this.setState({
      selected
    });
  }

  render () {
    const {mode, onTogglePlay, onPausePlay, onAddNewEntity, onNewGame} = this.props;
    const {selected} = this.state;
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
      &nbsp;
      <select onChange={this.onChange} value={selected}>
        <option value="demoGame" >Demo Game</option>
        <option value="demoGame2" >Default2</option>
      </select>
      <button title="load game" onClick={this.onLoadGame}>Load</button>
    </header>;
  }
}

export default MenuBar;
