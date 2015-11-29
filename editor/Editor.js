import React from "react";
import $ from "jquery";

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
      mode: "PLAY",
      sidebarTab: "ents",
      mouseDown: false
    }

    this.last = 0;

    this.onAdd = this.onAdd.bind(this);
    this.onDuplicate = this.onDuplicate.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectTab = this.onSelectTab.bind(this);

    this.tick = this.tick.bind(this);
    this.onTogglePlay = this.onTogglePlay.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
    this.onEntityDown = this.onEntityDown.bind(this);
    this.onEntityDrag = this.onEntityDrag.bind(this);
    this.onEntityUp = this.onEntityUp.bind(this);

    // Hack: tick one frame of game to start in edit mode.
    requestAnimationFrame(() => {
      this.state.game.update(0);
      this.onTogglePlay();
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
      this.removeDragHandlers();
    } else {
      this.addDragHandlers();
    }
  }

  addDragHandlers () {
    $(Env.game.container)
      .on("mousedown", ".entity", this.onEntityDown)
      .on("mousemove", this.onEntityDrag)
      .on("mouseup", this.onEntityUp);
  }

  removeDragHandlers () {
    $(Env.game.container)
      .off("mousedown", ".entity", this.onEntityDown)
      .off("mousemove", this.onEntityDrag)
      .off("mouseup", this.onEntityUp);
  }

  onEntityDown (e) {
    this.onSelect(Env.game.getEntityByName(e.target.getAttribute("data-entity")));
    this.setState({
      mouseDown: true
    })
  }

  onEntityUp (e) {
    this.setState({
      mouseDown: false
    })
  }

  onEntityDrag (e) {
    const {selected, mouseDown} = this.state;
    if (!selected || !mouseDown) {
      return;
    }
    const pos = selected.getComponent("Position");
    if (!pos) {
      return;
    }

    pos.x = e.clientX - (pos.w / 2);
    pos.y = e.clientY - (pos.h);
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
      this.handleKeys();
      this.state.game.renderOnlyUpdate();
    }
    requestAnimationFrame(this.tick);
  }

  handleKeys () {
    if (Keys.pressed(68)) {
      this.onDuplicate();
    }

    if (Keys.pressed(8)) {
      const {game, selected} = this.state;
      if (game && selected ) {
        game.removeEntity(selected);
      }
    }
  }

  //TODO: rename to onAddNew
  onAdd () {
    this.onSelect(Env.game.addBlankEntity());
  }

  onDuplicate () {
    const {game, selected} = this.state;
    const newEntity = game.spawn(selected);
    const newPos = newEntity.getComponent("Position");
    const pos = selected.getComponent("Position");
    newPos.x = pos.x + pos.w;
    newPos.y = pos.y - (pos.h / 2) | 0;

    this.onSelect(newEntity);
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
        <SideBar game={game} selected={selected} onDuplicate={this.onDuplicate} onSelect={this.onSelect} tab={sidebarTab} onSelectTab={this.onSelectTab} />
        <GameUI game={game} />
      </div>
      <footer className="footer">...</footer>
    </div>
  }
}

export default Editor;
