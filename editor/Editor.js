import React from "react";

import MenuBar from "./MenuBar";
import GameUI from "./Game";
import SideBar from "./SideBar";

import Game from "../Game";
import Env from "../Env";

const {
  Component
} = React;

class Editor extends Component {

  constructor () {
    super();

    this.state = {
      game: null,
      selected: null,
      mode: "PLAY"
    }

    this.last = 0;

    this.onAdd = this.onAdd.bind(this);
    this.onSelect = this.onSelect.bind(this);

    this.tick = this.tick.bind(this);
    this.onTogglePlay = this.onTogglePlay.bind(this);
  }

  onTogglePlay () {
    this.setState({
      mode: this.state.mode === "PLAY" ? "EDIT" : "PLAY"
    });
  }

  tick (time) {
    const dt = this.last ? time - this.last : 1000 / 60;
    this.last = time;

    if (this.state.mode === "PLAY") {
      this.state.game.update(dt);
    }
    requestAnimationFrame(this.tick);
  }

  onAdd () {
    this.onSelect(Env.game.addBlankEntity());
  }

  onSelect (selected) {
    this.setState({
      selected
    });
  }

  componentDidMount () {
    const game = new Game(document.querySelector("#game"));
    game.init();
    this.setState({game});

    setInterval(() => {
      this.forceUpdate();
    }, 1000);

    requestAnimationFrame(this.tick);
  }

  render () {
    const {game, selected, mode} = this.state;

    return <div>
      <MenuBar game={game} onAdd={this.onAdd} mode={mode} onTogglePlay={this.onTogglePlay}/>
      <div className="main">
        <SideBar game={game} selected={selected} onSelect={this.onSelect} />
        <GameUI game={game} />
      </div>
      <footer className="footer">...</footer>
    </div>
  }
}

export default Editor;
