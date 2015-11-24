import Component from "./Component";
import theGame from "../theGame";

class Spawner extends Component {

  constructor (prefab, rate = 2, xRange = 0, yRange = 0) {
    super();
    this.name = "Spawner";
    this.prefabName = prefab;
    this.rate = rate;
    this.xRange = xRange;
    this.yRange = yRange;
    this.time = 0;
  }

  start () {
    this.prefab = theGame.getEntityByName(this.prefabName);
    this.pos = this.getComponent("Position");
  }

  update (dt) {
    this.time += dt;
    if (this.time > this.rate) {
      this.time -= this.rate;
      const e = theGame.spawn(this.prefab);
      // Set the new position near the spawner
      const pos = e.getComponent("Position");
      const x = Math.random() * this.xRange;
      const y = Math.random() * this.yRange;
      pos.x = this.pos.x + (x - this.xRange / 2);
      pos.y = this.pos.y + (y - this.yRange / 2);
    }
  }
}

Spawner.propTypes = {
  prefab: "Instance",
  rate: "Number",
  xRange: "Number",
  yRange: "Number"
};

export default Spawner;
