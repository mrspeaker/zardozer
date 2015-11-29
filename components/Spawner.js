import Component from "./Component";
import Env from "../Env";

class Spawner extends Component {

  static deps = ["Position"];
  static propTypes = {
    enabled: "Boolean",
    prefab: "Instance",
    rate: "Number",
    initialDelay: "Number"
  };

  enabled = true;
  time = 0;
  isFirst = true;

  constructor (prefab, rate = 1, initialDelay = 2) {
    super();
    this.prefabName = prefab;
    this.rate = rate;
    this.initialDelay = initialDelay;
  }

  start () {
    super.start();
    this.prefab = Env.game.getPrefabByName(this.prefabName);
  }

  update (dt) {
    if (!this.enabled) { return; }

    this.time += dt;
    const rate = this.isFirst ? this.initialDelay : this.rate;
    if (this.time > rate) {
      this.time -= this.rate;
      const {x, y, w, h} = this.deps.Position;
      const e = Env.game.spawn(this.prefab);
      // Set the new position in spawner area
      const pos = e.getComponent("Position");
      const xo = Math.random() * w;
      const yo = Math.random() * h;
      pos.x = x + xo - (pos.w / 2);
      pos.y = y + yo - (pos.h / 2);

      this.isFirst = false;
    }
  }
}

export default Spawner;
