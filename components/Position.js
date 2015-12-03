import Component from "./Component";

class Position extends Component {

  static propTypes = {
    x: "Number",
    y: "Number",
    w: "Number",
    h: "Number",
    z: "Number"
  };

  _lastX;
  _lastY;

  constructor (x = 0, y = 0, w = 32, h = 32, z = 5) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.z = z;
  }

}

export default Position;
