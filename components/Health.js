import Component from "./Component";
import Env from "../Env";

class Health extends Component {

  constructor (amount, rate = 1) {
    super();
    this.name = "Health";
    this.amount = amount;
    this.rate = rate;
  }

  update () {
    if (this.amount < 0) {
      Env.game.removeEntity(this.entity);
    }
  }

}

Health.propTypes = {
  amount: "Number",
  rate: "Number"
}

export default Health;
