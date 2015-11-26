import Component from "./Component";
import Env from "../Env";

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

  start () {
    super.start();
    this.target = Env.game.getEntityByName(this.target);
    this.targetPos = this.target.getComponent("Position");
  }

  update () {
    if (!this.enabled) { return false; }
    const pos = this.deps.Position;
    const {targetPos, speed} = this;
    const dx = targetPos.x - pos.x;
    const dy = targetPos.y - pos.y;
    const s = speed;
    pos.x += dx > 0 ? s : -s;
    pos.y += dy > 0 ? s : -s;
  }

}

export default MoveTowards;
