import Component from "./Component";

class FlyRight extends Component {

  static deps = ["Position"];
  static propTypes = {
    enabled: "Boolean",
    speed: "Number"
  };

  constructor (speed = 5) {
    super();
    this.enabled = true;
    this.speed = speed;
  }

  update (dt) {
    if (!this.enabled) { return; }
    const {speed} = this;
    this.deps.Position.x += speed * dt * 100;
  }

}

export default FlyRight;
