import Component from "./Component";

class Ager extends Component {

  constructor (rate = 1) {
    super();
    this.name = "Ager";
    this.rate = rate;
  }

  start () {
    this.target = this.getComponent("Health");
  }

  update (dt) {
    this.target.amount -= dt * this.rate;
  }

}

Ager.propTypes = {
  rate: "Number"
};

export default Ager;
