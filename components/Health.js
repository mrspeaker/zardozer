import Component from "./Component";
import Env from "../Env";

class Health extends Component {

  static propTypes = {
    amount: "Number"
  };

  constructor (amount) {
    super();
    this.amount = amount;
  }

  update () {
    if (this.amount < 0) {
      Env.game.removeEntity(this.entity);
    }
  }

}

export default Health;
