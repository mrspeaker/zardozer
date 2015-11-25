import Component from "./Component";
import Env from "../Env";

class MoveTowards extends Component {

  constructor (target, speed = 0.2) {
    super();
    this.name = "MoveTowards";
    this.target = target;
    this.speed = speed;
  }

  start () {
    this.pos = this.getComponent("Position");
    const targetEntity = Env.game.getEntityByName(this.target);
    this.target = targetEntity.getComponent("Position");
  }

  update () {
    const dx = this.target.x - this.pos.x;
    const dy = this.target.y - this.pos.y;
    const s = this.speed;
    this.pos.x += dx > 0 ? s : -s;
    this.pos.y += dy > 0 ? s : -s;
  }

}

MoveTowards.propTypes = {
  target: "Instance",
  speed: "Number"
};

export default MoveTowards;
