import Component from "./Component";

class Damage extends Component {

  static deps = ["Health"];
  static propTypes = {
    enabled: "Boolean",
    rate: "Number"
  };

  constructor (rate = 1) {
    super();
    this.enabled = true;
    this.rate = rate;
  }

  update (dt) {
    if (!this.enabled) { return; }

    this.deps.Health.amount -= dt * this.rate;
  }

}

export default Damage;
