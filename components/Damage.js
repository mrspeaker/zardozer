import Component from "./Component";
import Env from "../Env";

class Damage extends Component {

  static propTypes = {
    enabled: "Boolean",
    hits: "Number",
    hitBy: "String"
  };

  constructor (hits = 1, hitBy = "bullet") {
    super();
    this.enabled = true;
    this.hits = hits;
    this.hitBy = hitBy;
  }

  onCollision (e) {
    if (!this.enabled) { return; }
    if (e.prefab.name === this.hitBy) {
      Env.game.removeEntity(e);
      if (--this.hits <=0) {
        Env.game.removeEntity(this.entity);
      }
    }
  }

}

export default Damage;
