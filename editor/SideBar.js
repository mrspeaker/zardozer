import React from "react";
import Entity from "./Entity";

const {
  Component
} = React;

class SideBar extends Component {

  constructor () {
    super();
    this.onEntitySelect = this.onEntitySelect.bind(this);
  }

  onSelectTab (tab) {
    this.props.onSelectTab(tab);
  }

  onEntitySelect (e) {
    this.props.onSelect(e);
  }

  render () {
    const {game, selected, tab} = this.props;
    if (!game) return null;

    const {entities} = game;

    return <div className="sidebar">
      <div className="mainTabs" style={{paddingBottom: "5px"}}>
        <button title="List all active entities" className={tab === "ents" ? "tabOui" : "tabNon"} onClick={() => this.onSelectTab("ents")}>Entities</button>
        <button title="Show selected entity details" className={tab === "ent" ? "tabOui" : "tabNon"} onClick={() => this.onSelectTab("ent")}>Selected</button>
      </div>
      <div className="sidebarContent">
        {tab === "ent" && <Entity entity={selected} />}
        {tab === "ents" && <div>
          <strong>Active entities: {entities.length}</strong>
          {entities.map((e, i) => {
            return <div key={i} onClick={() => this.onEntitySelect(e)}>{e.name}</div>;
          })}
        </div>}
      </div>
    </div>
  }
}

export default SideBar;
