import Component from "./Component";
import Keys from "../controls/Keys";
import Env from "../Env";

class KeyShooter extends Component {

  static deps = ["Position"];

  constructor () {
    super();
  }

  update (dt) {
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
