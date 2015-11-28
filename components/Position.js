import Component from "./Component";

class Position extends Component {

  static propTypes = {
    x: "Number",
    y: "Number",
    w: "Number",
    h: "Number"
  };

  constructor (x = 0, y = 0, w = 32, h = 32) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

}

export default Position;
