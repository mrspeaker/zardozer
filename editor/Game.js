import React from "react";

const {
  Component
} = React;

class GameUI extends Component {

  render () {
    return <div id="screen" className="no-select">
      <div id="game" tabIndex="1"></div>
    </div>;
  }
}

export default GameUI;
