import Component from './Component';
import theGame from "../theGame";

class Health extends Component {

  constructor (amount, rate = 1) {
    super();
    this.name = "Health";
    this.amount = amount;
    this.rate = rate;
  }

  update (dt) {
    this.amount -= dt * this.rate;
    if (this.amount < 0) {
      theGame.remove(this.entity);
    }
  }

}

export default Health;
