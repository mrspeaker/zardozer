import Component from "./Component";
import Keys from "../controls/Keys";
import Env from "../Env";

class KeyShooter extends Component {

  static deps = ["Position"];
  static propTypes = {
    enabled: "Boolean",
    repeat: "Number"
  };

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

    this.time = 0;
    const pos = this.deps.Position;
    const b = Env.game.addPrefabByName("bullet");
    const bPos = b.getComponent("Position");
    // TODO: offset should be option.
    bPos.x = pos.x + 17;
    bPos.y = pos.y + 9;
  }

}

export default KeyShooter;
