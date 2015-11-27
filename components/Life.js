import Component from "./Component";
import Env from "../Env";

class Life extends Component {

  static propTypes = {
    enabled: "Boolean",
    time: "Number"
  };

  constructor (time = 5) {
    super();
    this.enabled = true;
    this.time = time;
  }

  update (dt) {
    if (!this.enabled) { return; }
    this.time -= dt;
    if (this.time < 0) {
      Env.game.removeEntity(this.entity);
    }
  }

}

export default Life;
