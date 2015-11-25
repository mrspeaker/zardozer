import Component from "./Component";

class Damage extends Component {

  constructor (rate = 1) {
    super();
    this.name = "Damage";
    this.enabled = true;
    this.rate = rate;
  }

  start () {
    this.target = this.getComponent("Health");
  }

  update (dt) {
    if (!this.enabled) { return; }

    this.target.amount -= dt * this.rate;
  }

}

Damage.propTypes = {
  enabled: "Boolean",
  rate: "Number"
};

export default Damage;
