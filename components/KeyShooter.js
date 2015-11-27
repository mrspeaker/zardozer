import Component from "./Component";
import Keys from "../controls/Keys";
import Env from "../Env";

class KeyShooter extends Component {

  static deps = ["Position"];
  static propTypes = {
    enabled: "Boolean"
  };

  constructor () {
    super();
    this.enabled = true;
  }

  update (dt) {
    if (!this.enabled) { return; }
    if (!Keys.isDown(32)) {
      return;
    }
    const pos = this.deps.Position;
    const b = Env.game.addPrefabByName("bullet");
    const bPos = b.getComponent("Position");
    bPos.x = pos.x;
    bPos.y = pos.y;
  }

}

export default KeyShooter;
