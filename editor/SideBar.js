import React from "react";
import Entity from "./Entity";

const {
  Component
} = React;

class SideBar extends Component {

  constructor () {
    super();
    this.state = {
      tab: "ents"
    }
    this.onSelect = this.onSelect.bind(this);
    this.onEntitySelect = this.onEntitySelect.bind(this);
  }

  onSelect (tab) {
    this.setState({tab});
  }

  onEntitySelect (e) {
    this.setState({tab:"ent"});
    this.props.onSelect(e);
  }

  render () {
    const {game, selected} = this.props;
    if (!game) return null;

    const {entities} = game;
    const {tab} = this.state;

    return <div className="sidebar">
      <div className="mainTabs" style={{paddingBottom: "5px"}}>
        <button className={tab === "ents" ? "tabOui" : "tabNon"} onClick={() => this.onSelect("ents")}>Entities</button>
        <button className={tab === "ent" ? "tabOui" : "tabNon"} onClick={() => this.onSelect("ent")}>Selected</button>
      </div>
      <div className="sidebarContent">
        {this.state.tab === "ent" && <Entity entity={selected} />}
        {this.state.tab === "ents" && <div>
          <strong>Active entities: {entities.length}</strong>
          {entities.map((e, i) => {
            return <div key={i} onClick={() => this.onEntitySelect(e)}>{e.name} ({e.id})</div>;
          })}
        </div>}
      </div>
    </div>
  }
}

export default SideBar;
