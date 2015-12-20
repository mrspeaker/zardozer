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
        let prefabIndex = (Math.random() * this.prefabs.length - 1 | 0) + 1;
        if (j == 0 || i == 0 || j == yTiles - 1 || i == xTiles - 1) {
          prefabIndex = 0;
        }
        const prefab = this.prefabs[prefabIndex];
        // Could do this by name, not instance! What's better?
        const e = Env.game.addPrefabFromInstance(prefab, x + (i * tileW), y + (j * tileH));
        e.parent = this.entity.parent;
        this.map.push(prefabIndex);
      }
    }

    this.tileW = tileW;
    this.tileH = tileH;
    this.w = xTiles;
    this.h = yTiles;

  }

  getTileFromPixel (x, y) {
    // FIXME: not considering this elements offset
    return this.map[(y / this.tileH | 0) * this.w + (x / this.tileW | 0)];
  }

}

export default GridIt;
