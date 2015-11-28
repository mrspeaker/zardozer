import Component from "./Component";
import Env from "../Env";

class Player extends Component {

  onCollision (e) {
    if (e.prefab.args[0] === "ghost") {
      Env.game.removeEntity(e);
      Env.game.removeEntity(this.entity);
      Env.game.reset();
    }
  }
}

export default Player;
