import Component from "./Component";

class MapCollider extends Component {

  static deps = ["Position"];
  static propTypes = {
    enabled: "Boolean",
    map: "Instance"
  };

  constructor (map) {
    super();
    this.map = map;
    this.enabled = true;
  }

  updatePrefab (fieldName, entityName) {
    super.updatePrefab (fieldName, entityName);
    this.grid = this.map.getComponent("GridIt");
    if (!this.grid) {
      throw new Error("MapCollider map instance requires component 'GridIt'");
    }
  }

  update () {
    if (!this.enabled) { return; }
    const pos = this.deps.Position;
    const {x, y, w, h, previousX, previousY} = pos;
    const tiles = [
      this.grid.getTileFromPixel(x, y),
      this.grid.getTileFromPixel(x + w, y),
      this.grid.getTileFromPixel(x, y + h),
      this.grid.getTileFromPixel(x + w, y + h)];
    if (tiles.some(t => t === 0)) {
      pos.x = previousX;
      pos.y = previousY;
    }
  }

}

export default MapCollider;
