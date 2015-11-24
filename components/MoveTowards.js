import theGame from "../theGame";
import Component from './Component';

class MoveTowards extends Component {

  constructor (target, speed = 0.2) {
    super();
    this.name = "Wander";
    this.targetName = target;
    this.speed = speed;
  }

  start () {
    this.pos = this.getComponent("Position");
    const targetEntity = theGame.getEntityByName(this.targetName);
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

export default MoveTowards;
