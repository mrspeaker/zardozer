import Component from "./Component";
import Env from "../Env";

class MoveTowards extends Component {

  constructor (target, speed = 0.2) {
    super();
    this.name = "MoveTowards";
    this.enabled = true;
    this.target = target;
    this.speed = speed;
  }

  start () {
    this.pos = this.getComponent("Position");
    this.target = Env.game.getEntityByName(this.target);
    this.targetPos = this.target.getComponent("Position");
  }

  update () {
    if (!this.enabled) { return false; }
    const {pos, targetPos, speed} = this;
    const dx = targetPos.x - pos.x;
    const dy = targetPos.y - pos.y;
    const s = speed;
    this.pos.x += dx > 0 ? s : -s;
    this.pos.y += dy > 0 ? s : -s;
  }

}

MoveTowards.propTypes = {
  enabled: "Boolean",
  target: "Instance",
  speed: "Number"
};

export default MoveTowards;
