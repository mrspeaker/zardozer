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

    const dx = x - previousX;
    const dy = y - previousY;

    let xo = previousX;
    let yo = y;
    if (dy) {
      const tiles = [
        this.grid.getTileFromPixel(xo, yo),
        this.grid.getTileFromPixel(xo + w, yo),
        this.grid.getTileFromPixel(xo, yo + h),
        this.grid.getTileFromPixel(xo + w, yo + h)];
      if (tiles.some(t => t === 0)) {
        yo = previousY;
      }
    }
    xo = x;
    if (dx) {
      const tiles = [
        this.grid.getTileFromPixel(xo, yo),
        this.grid.getTileFromPixel(xo + w, yo),
        this.grid.getTileFromPixel(xo, yo + h),
        this.grid.getTileFromPixel(xo + w, yo + h)];
      if (tiles.some(t => t === 0)) {
        xo = previousX;
      }
    }

    pos.x = xo;
    pos.y = yo;

  }

}

export default MapCollider;
