import React from "react";
import Entity from "./Entity";

const {
  Component
} = React;

class SideBar extends Component {

  constructor () {
    super();
    this.state = {
      selected: null
    }
  }

  onClick (selected) {
    this.setState({selected});
  }

  render () {
    const {game} = this.props;
    if (!game) return null;
    const {selected} = this.state;

    const {entities} = game;

    return <div className="sidebar">

      <Entity entity={selected} />
      <hr />
      <div><strong>Active entities: {entities.length}</strong></div>
      {entities.map((e, i) => {
        return <div key={i} onClick={() => this.onClick(e)}>{e.name}</div>;
      })}
    </div>
  }
}

export default SideBar;
