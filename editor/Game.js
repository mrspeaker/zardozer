import React from "react";

const {
  Component
} = React;

class GameUI extends Component {

  constructor () {
    super();
  }

  render () {
    return <div id="screen">
      <div id="game"></div>
    </div>
  }
}

export default GameUI;
