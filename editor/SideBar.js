import React from "react";
import Entity from "./Entity";

const {
  Component
} = React;

class SideBar extends Component {

  constructor () {
    super();
  }

  render () {
    const {game, selected} = this.props;
    if (!game) return null;

    const {entities} = game;

    return <div className="sidebar">

      <Entity entity={selected} />
      <hr />
      <div><strong>Active entities: {entities.length}</strong></div>
      {entities.map((e, i) => {
        return <div key={i} onClick={() => this.props.onSelect(e)}>{e.name} ({e.id})</div>;
      })}
    </div>
  }
}

export default SideBar;
