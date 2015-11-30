import Component from "./Component";

class MoveTowards extends Component {

  static deps = ["Position"];
  static propTypes = {
    enabled: "Boolean",
    target: "Instance",
    speed: "Number"
  };

  constructor (target, speed = 0.2) {
    super();
    this.enabled = true;
    this.target = target;
    this.speed = speed;
  }

  updatePrefab (fieldName, entityName) {
    super.updatePrefab (fieldName, entityName);
    this.targetPos = this.target.getComponent("Position");
  }

  update () {
    if (!this.enabled) { return false; }
    const pos = this.deps.Position;
    const {targetPos, speed} = this;
    const dx = targetPos.x - pos.x;
    const dy = targetPos.y - pos.y;
    const s = speed;
    const angle = Math.atan2(dy, dx);
    pos.x += Math.cos(angle) * s;
    pos.y += Math.sin(angle) * s;
  }

}

export default MoveTowards;
