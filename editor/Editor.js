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
      mode: "EDIT"
    }

    this.onAdd = this.onAdd.bind(this);
    this.onSelect = this.onSelect.bind(this);
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
    }, 1000)
  }

  render () {
    const {game, selected} = this.state;

    return <div>
      <MenuBar game={game} onAdd={this.onAdd}/>
      <div className="main">
        <SideBar game={game} selected={selected} onSelect={this.onSelect} />
        <GameUI game={game} />
      </div>
      <footer className="footer">.</footer>
    </div>
  }
}

export default Editor;
