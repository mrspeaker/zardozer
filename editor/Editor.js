import React from "react";

import MenuBar from "./MenuBar";
import GameUI from "./Game";
import Game from "../Game";
import SideBar from "./SideBar";

const {
  Component
} = React;

class Editor extends Component {

  constructor () {
    super();

    this.state = {
      game: null
    }
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
    const {game} = this.state;

    return <div>
      <MenuBar game={game} />
      <div className="main">
        <SideBar game={game} />
        <GameUI game={game} />
      </div>
      <footer className="footer">.</footer>
    </div>
  }
}

export default Editor;
