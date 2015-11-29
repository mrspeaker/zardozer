import Component from "./Component";
import Keys from "../controls/Keys";
import Env from "../Env";

class KeyShooter extends Component {

  static deps = ["Position"];
  static propTypes = {
    enabled: "Boolean",
    repeat: "Number"
  };

  direction = 1;

  constructor (repeat = 0.1) {
    super();
    this.time = 0;
    this.enabled = true;
    this.repeat = repeat;
  }

  update (dt) {
    if (!this.enabled) { return; }
    this.time += dt;
    if (!Keys.isDown(32) || this.time < this.repeat) {
      return;
    }

    if (Keys.isDown(37)) { this.direction = -1; }
    if (Keys.isDown(39)) { this.direction = 1; }

    this.time = 0;
    const pos = this.deps.Position;
    const b = Env.game.addPrefabByName("bullet");
    const bPos = b.getComponent("Position");
    const bFly = b.getComponent("FlyRight");
    bFly.speed = 5 * this.direction;

    // TODO: offset should be option.
    bPos.x = pos.x + (this.direction * ((pos.w / 2) - bPos.w));
    bPos.y = pos.y + (pos.h / 2) - (bPos.h / 2);
  }

}

export default KeyShooter;
