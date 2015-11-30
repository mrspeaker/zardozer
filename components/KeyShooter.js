import Component from "./Component";
import Keys from "../controls/Keys";
import Env from "../Env";

class KeyShooter extends Component {

  static deps = ["Position"];
  static propTypes = {
    enabled: "Boolean",
    bullet: "Instance",
    repeat: "Number"
  };

  direction = 1;

  constructor (bullet, repeat = 0.1) {
    super();
    this.time = 0;
    this.enabled = true;
    this.bullet = bullet;
    this.repeat = repeat;
  }

  update (dt) {
    if (!this.enabled) { return; }
    this.time += dt;
    if (!Keys.isDown(32) || this.time < this.repeat) {
      return;
    }
    this.time = 0;
    if (Keys.isDown(37)) { this.direction = -1; }
    if (Keys.isDown(39)) { this.direction = 1; }

    const {x, y, w, h} = this.deps.Position;
    const b = Env.game.addPrefabFromInstance(this.bullet);
    const bPos = b.getComponent("Position");
    const bFly = b.getComponent("FlyRight");
    bFly.speed = 5 * this.direction;
    bPos.x = x + (this.direction * ((w / 2) - bPos.w));
    bPos.y = y + (h / 2) - (h / 2);
  }

}

export default KeyShooter;
