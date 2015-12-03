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
  }

  update () {
    if (!this.enabled) { return; }
    const pos = this.deps.Position;
    const {x, y, _lastX, _lastY} = pos;
    const tile = this.grid.getTileFromPixel(x, y);
    if (tile === 0) {
      pos.x = _lastX;
      pos.y = _lastY;
    }
  }

}

export default MapCollider;
