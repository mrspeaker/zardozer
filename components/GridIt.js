import Component from "./Component";
import Env from "../Env";

class GridIt extends Component {

  // TODO: how to handle arrays
  static propTypes = {
    prefabs: "Array<Instance>"
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
    this.map = [];
    for (let j = 0; j < yTiles; j++) {
      for (let i = 0; i < xTiles; i++) {
        const prefabIndex = Math.random() * this.prefabs.length | 0;
        const prefab = this.prefabs[prefabIndex];
        // Could do this by name, not instance! What's better?
        Env.game.addPrefabFromInstance(prefab, x + (i * tileW), y + (j * tileH));
        this.map.push(prefabIndex);
      }
    }

    this.tileW = tileW;
    this.tileH = tileH;
    this.w = xTiles;
    this.h = yTiles;

  }

  getTileFromPixel (x, y) {
    return this.map[(y / this.tileH | 0) * this.w + (x / this.tileW | 0)];
  }

}

export default GridIt;
