import Component from "./Component";
import Keys from "../controls/Keys";
import Env from "../Env";

class KeyShooter extends Component {

  static deps = ["Position"];
  static requires = ["Move"];
  static propTypes = {
    enabled: "Boolean",
    bullet: "Instance",
    repeat: "Number"
  };

  xDir = 1;
  yDir = 0;

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

    let xo = 0;
    let yo = 0;
    if (Keys.isDown(37)) { xo = -1; }
    if (Keys.isDown(39)) { xo = 1; }
    if (Keys.isDown(38)) { yo = -1; }
    if (Keys.isDown(40)) { yo = 1; }

    if (xo || yo) {
      this.xDir = xo;
      this.yDir = yo;
    }

    if (!Keys.isDown(32) || this.time < this.repeat) {
      return;
    }
    this.time = 0;

    const {x, y, w, h} = this.deps.Position;
    const {xDir, yDir} = this;
    const b = Env.game.addPrefabFromInstance(this.bullet);
    const bPos = b.getComponent("Position");
    const bMove = b.getComponent("Move");
    bMove.xSpeed = xDir * 5;
    bMove.ySpeed = yDir * 5;

    bPos.x = x + (this.xDir * ((w / 2) - bPos.w));
    bPos.y = y + (h / 2) - (h / 2);
  }

}

export default KeyShooter;
