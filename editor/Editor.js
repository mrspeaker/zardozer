import React from "react";
import $ from "jquery";

import MenuBar from "./MenuBar";
import GameUI from "./Game";
import SideBar from "./SideBar";

import Game from "../Game";
import Env from "../Env";
import Entities from "../entities/Entities";
import Keys from "../controls/Keys";
import GameData from "../game/demoGame";

const {
  Component
} = React;

class Editor extends Component {

  lastTime = 0;

  constructor () {
    super();

    this.state = {
      game: null,
      selected: null,
      mode: "PLAY",
      sidebarTab: "ents",
      mouseDown: false
    };

    this.tick = this.tick.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
    this.onTogglePlay = this.onTogglePlay.bind(this);
    this.onPausePlay = this.onPausePlay.bind(this);
    this.onAddNewEntity = this.onAddNewEntity.bind(this);
    this.onDuplicate = this.onDuplicate.bind(this);
    this.onSelectEntity = this.onSelectEntity.bind(this);
    this.onSelectTab = this.onSelectTab.bind(this);

    this.onEntityDown = this.onEntityDown.bind(this);
    this.onEntityDrag = this.onEntityDrag.bind(this);
    this.onEntityUp = this.onEntityUp.bind(this);

    // Hack: tick one frame of game to start in edit mode.
    requestAnimationFrame(() => {
      this.state.game.update(0);
      this.onTogglePlay();
    });
  }

  componentDidMount () {
    this.createGame();
    setInterval(() => {
      this.forceUpdate();
    }, 500);

    requestAnimationFrame(this.tick);
  }

  createGame () {
    const game = new Game(document.querySelector("#game"));
    game.init(GameData.scenes[GameData.initial]);
    this.setState({game});
  }

  onTogglePlay () {
    const curMode = this.state.mode;

    if (curMode === "EDIT") {
      this.setState({
        mode: "PLAY"
      });
      this.removeDragHandlers();
      this.serializeLevel(); //- for saving edits
      Env.game.container.focus();
    }

    else if (curMode === "PLAY" || curMode === "PAUSE") {
      this.setState({
        mode: "EDIT"
      });
      if (curMode !== "PAUSE") { // don't double-add if paused->stop
        this.addDragHandlers();
      }
      Env.game.reset(true); //- for saving edits (reset)
    }

  }

  onPausePlay () {
    const curMode = this.state.mode;

    if (curMode === "PLAY") {
      this.setState({
        mode: "PAUSE"
      });
      this.addDragHandlers();
    }
    else if (curMode === "PAUSE") {
      this.setState({
        mode: "PLAY"
      });
      this.removeDragHandlers();
      Env.game.container.focus();
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
    this.onSelectEntity(Env.game.getEntityByName(e.target.getAttribute("data-entity")));
    this.setState({
      mouseDown: true
    });
  }

  onEntityUp () {
    this.setState({
      mouseDown: false
    });
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
    const dt = this.lastTime ? time - this.lastTime : 1000 / 60;
    this.lastTime = time;

    // Enter to toggle play mode.
    if (Keys.pressed(13)) {
      this.onTogglePlay();
    }

    if (Keys.pressed(80)) {
      this.onPausePlay();
    }


    if (this.state.mode === "PLAY") {
      // Normal game tick.
      this.state.game.update(dt);
    } else {
      this.handleKeys();
      this.state.game.updateRenderOnly(dt);
    }
    requestAnimationFrame(this.tick);
  }

  handleKeys () {
    const {game, selected} = this.state;

    if (!selected) {
      return;
    }

    if (Keys.pressed(68)) {
      this.onDuplicate();
    }

    if (Keys.pressed(8)) {
      game.removeEntity(selected);
    }

    if (Keys.isDown(37)) {
      selected.getComponent("Position").x -= 1;
    }
    if (Keys.isDown(39)) {
      selected.getComponent("Position").x += 1;
    }
    if (Keys.isDown(38)) {
      selected.getComponent("Position").y -= 1;
    }
    if (Keys.isDown(40)) {
      selected.getComponent("Position").y += 1;
    }
  }

  // Turns the entity tree into json
  serializeLevel () {
    const game = Env.game;
    const {entities} = game;
    const serializeable = entities.filter(e => e.serialize);
    const serializedData = serializeable.map(Entities.serialize);
    GameData.scenes["scene 1"].entities = serializedData;
  }

  onAddNewEntity () {
    const ent = Env.game.addBlankEntity();
    ent.serialize = true; //TODO: better seriealize=true!
    this.onSelectEntity(ent);
  }

  onDuplicate () {
    const {game, selected} = this.state;
    const newEntity = game.addPrefabFromInstance(selected);
    newEntity.serialize = true; //TODO: better seriealize=true!
    const newPos = newEntity.getComponent("Position");
    const pos = selected.getComponent("Position");
    newPos.x = pos.x + pos.w;
    newPos.y = pos.y - (pos.h / 2) | 0;

    this.onSelectEntity(newEntity);
  }

  onSelectEntity (selected) {
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

  render () {
    const {game, selected, mode, sidebarTab} = this.state;

    return <div>
      <MenuBar
        game={game}
        mode={mode}
        onNewGame={this.onNewGame}
        onTogglePlay={this.onTogglePlay}
        onPausePlay={this.onPausePlay}
        onAddNewEntity={this.onAddNewEntity} />

      <div className="main">
        <SideBar
          game={game}
          selected={selected}
          tab={sidebarTab}
          onDuplicate={this.onDuplicate}
          onSelect={this.onSelectEntity}
          onSelectTab={this.onSelectTab} />
        <GameUI game={game} />
      </div>

      <footer className="footer">...</footer>
    </div>;
  }
}

export default Editor;
