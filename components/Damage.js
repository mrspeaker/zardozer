import Component from "./Component";

class Damage extends Component {

  constructor (rate = 1) {
    super();
    this.name = "Damage";
    this.rate = rate;
  }

  start () {
    this.target = this.getComponent("Health");
  }

  update (dt) {
    this.target.amount -= dt * this.rate;
  }

}

Damage.propTypes = {
  rate: "Number"
};

export default Damage;
