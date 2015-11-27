import Component from "./Component";
import Keys from "../controls/Keys";

class KeyController extends Component {

  static deps = ["Position"];
  static propTypes = {
    enabled: "Boolean",
    speed: "Number"
  };

  constructor (speed = 2.5) {
    super();
    this.enabled = true;
    this.speed = speed;
  }

  update (dt) {
    if (!this.enabled) { return; }
    const {speed} = this;
    const pos = this.deps.Position;
    const power = speed * dt * 100;

    let xo = 0;
    let yo = 0;
    if (Keys.isDown(38)) {
      yo -= power;
    }
    else if (Keys.isDown(40)) {
      yo += power;
    }
    if (Keys.isDown(37)) {
      xo -= power;
    }
    else if (Keys.isDown(39)) {
      xo += power;
    }

    if (xo !== 0 && yo !== 0) {
      const off = Math.sqrt(2);
      xo /= off;
      yo /= off;
    }

    pos.x += xo;
    pos.y += yo;

  }

}

export default KeyController;
