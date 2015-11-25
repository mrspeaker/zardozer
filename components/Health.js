import Component from "./Component";
import Env from "../Env";

class Health extends Component {

  constructor (amount) {
    super();
    this.name = "Health";
    this.amount = amount;
  }

  update () {
    if (this.amount < 0) {
      Env.game.removeEntity(this.entity);
    }
  }

}

Health.propTypes = {
  amount: "Number"
}

export default Health;
