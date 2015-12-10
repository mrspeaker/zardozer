import React from "react";

const {
  Component
} = React;

class EntitiesUI extends Component {

  constructor () {
    super();
  }

  render () {
    const {entities, selected} = this.props;

    return <div>
      <strong>Active entities: {entities.length}</strong>
      {entities.map((e, i) => {
        return e === selected ?
          <strong key={"sel-" + i} ><div onClick={() => this.onEntitySelect(e)}>{e.name}</div></strong>:
          <div key={"sel-" + i} onClick={() => this.onEntitySelect(e)}>{e.name}</div>;
      })}
    </div>;
  }

}

export default EntitiesUI;
