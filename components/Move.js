import Component from "./Component";

class Move extends Component {

  static deps = ["Position"];
  static propTypes = {
    enabled: "Boolean",
    xSpeed: "Number",
    ySpeed: "Number"
  };

  constructor (xSpeed = 1, ySpeed = 0) {
    super();
    this.enabled = true;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  update (dt) {
    if (!this.enabled) { return; }
    const {xSpeed, ySpeed} = this;
    this.deps.Position.x += xSpeed * dt * 100;
    this.deps.Position.y += ySpeed * dt * 100;
  }

}

export default Move;
