import React from "react";
import Env from "../Env";

const {
  Component
} = React;

class MenuBar extends Component {
  
  render () {
    return <header className="header">
      FallIn: test editor
      <span>
        <button onClick={this.props.onAdd}>Add</button>
      </span>
    </header>
  }
}

export default MenuBar;
