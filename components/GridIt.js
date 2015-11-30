import Component from "./Component";
import Env from "../Env";

class GridIt extends Component {

  // TODO: how to handle arrays
  static propTypes = {
    prefabs: "Array<Instance>",
  };

  constructor (prefabs) {
    super();
    this.prefabNames = prefabs;
  }

  start () {
    super.start();
    this.prefabs = this.prefabNames.map(p => Env.game.createPrefabFromName(p));
    const {x, y, w, h} = this.getComponent("Position");
    const {w:tileW, h:tileH} = this.prefabs[0].getComponent("Position");
    const xTiles = w / tileW | 0;
    const yTiles = h / tileH | 0;
    for (let j = 0; j < yTiles; j++) {
      for (let i = 0; i < xTiles; i++) {
        const prefab = this.prefabs[Math.random() * this.prefabs.length | 0];
        // Could do this by name, not instance! What's better?
        Env.game.addPrefabFromInstance(prefab, x + (i * tileW), y + (j * tileH));
      }
    }
  }

}

export default GridIt;
