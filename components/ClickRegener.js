import Mouse from "../controls/Mouse";
import Component from "./Component";

class ClickRegener extends Component {

  static deps = ["Health"];
  static propTypes = {
    regenAmount: "Number"
  };

  constructor (regenAmount = 10) {
    super();
    this.regenAmount = regenAmount;
  }

  update () {
    if (Mouse.pressed) {
      this.deps.Health.amount += this.regenAmount;
    }
  }

}

export default ClickRegener;
