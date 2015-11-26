import Component from "./Component";

class Position extends Component {

  static propTypes = {
    x: "Number",
    y: "Number"
  };

  constructor (x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;
  }

}

export default Position;
