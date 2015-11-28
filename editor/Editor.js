import React from "react";

import MenuBar from "./MenuBar";
import GameUI from "./Game";
import SideBar from "./SideBar";

import Game from "../Game";
import Env from "../Env";
import Keys from "../controls/Keys";

const {
  Component
} = React;

class Editor extends Component {

  constructor () {
    super();

    this.state = {
      game: null,
      selected: null,
      mode: "EDIT",
      sidebarTab: "ents",
    }

    this.last = 0;

    this.onAdd = this.onAdd.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectTab = this.onSelectTab.bind(this);

    this.tick = this.tick.bind(this);
    this.onTogglePlay = this.onTogglePlay.bind(this);
    this.onNewGame = this.onNewGame.bind(this);

    // Hack: tick one frame of game to start in edit mode.
    requestAnimationFrame(() => {
      this.state.game.update(0);
    });

  }

  onTogglePlay () {
    const mode = this.state.mode === "PLAY" ? "EDIT" : "PLAY";
    this.setState({
      mode
    });
    // Focus game (for key access)
    if (mode === "PLAY") {
      Env.game.container.focus();
    }
  }

  onNewGame () {
    Env.game.reset(false);
    requestAnimationFrame(() => {
      this.state.game.update(0);
    });
  }

  tick (time) {
    const dt = this.last ? time - this.last : 1000 / 60;
    this.last = time;

    // Enter to toggle play mode.
    if (Keys.pressed(13)) {
      this.onTogglePlay();
    }

    if (this.state.mode === "PLAY") {
      this.state.game.update(dt);
    } else {
      this.state.game.renderOnlyUpdate();
    }
    requestAnimationFrame(this.tick);
  }

  //TODO: rename to onAddNew
  onAdd () {
    this.onSelect(Env.game.addBlankEntity());
  }

  onSelect (selected) {
    this.setState({
      selected,
      sidebarTab: "ent"
    });
  }

  onSelectTab (tab) {
    this.setState({
      sidebarTab: tab
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
    const {game, selected, mode, sidebarTab} = this.state;

    return <div>
      <MenuBar game={game} onAdd={this.onAdd} mode={mode === "PLAY" ? "Pause" : "Play"} onNewGame={this.onNewGame} onTogglePlay={this.onTogglePlay}/>
      <div className="main">
        <SideBar game={game} selected={selected}  onSelect={this.onSelect} tab={sidebarTab} onSelectTab={this.onSelectTab} />
        <GameUI game={game} />
      </div>
      <footer className="footer">...</footer>
    </div>
  }
}

export default Editor;
