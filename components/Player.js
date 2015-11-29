import Component from "./Component";
import Env from "../Env";

class Player extends Component {

  static propTypes = {
    enabled: "Boolean"
  };

  enabled = true;

  constructor () {
    super();
  }

  onCollision (e) {
    if (!this.enabled) { return; }
    if (e.prefab.name === "ghost") {
      Env.game.removeEntity(e);
      Env.game.removeEntity(this.entity);
      Env.game.reset();
    }
  }
}

export default Player;
