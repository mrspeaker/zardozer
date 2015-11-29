import Component from "./Component";
import Env from "../Env";

class GridIt extends Component {

  static propTypes = {
    prefab: "Instance",
    prefab2: "Instance"
  };

  constructor (prefab, prefab2) {
    super();
    this.prefabName = prefab;
    this.prefabName2 = prefab2;
  }

  start () {
    super.start();
    const prefab = Env.game.getPrefabByName(this.prefabName);
    const pos = prefab.getComponent("Position");
    const {x, y, w, h} = pos;
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 11; i++) {
        const name = Math.random() < 0.3 ? this.prefabName : this.prefabName2;
        Env.game.spawn(Env.game.getPrefabByName(name), i * w, j * h);
      }
    }
  }

}

export default GridIt;
