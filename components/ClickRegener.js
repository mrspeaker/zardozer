import Mouse from "../controls/Mouse";
import Component from "./Component";

class ClickRegener extends Component {

  static deps = ["Life"];
  static propTypes = {
    regenAmount: "Number"
  };

  constructor (regenAmount = 1) {
    super();
    this.regenAmount = regenAmount;
  }

  update () {
    if (Mouse.pressed) {
      this.deps.Life.time += this.regenAmount;
    }
  }

}

export default ClickRegener;
