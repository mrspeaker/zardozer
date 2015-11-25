import React from "react";

const {
  Component
} = React;

class SideBar extends Component {
  render () {
    const {game} = this.props;
    if (!game) return null;
    const {entities} = game;
    return <div className="sidebar">
      <div>{entities.length}</div>
      {entities.map(e => {
        return <div>{e.name}</div>;
      })}
    </div>
  }
}

export default SideBar;
