import Component from "./Component";

class Wander extends Component {

  static deps = ["Position"];
  static propTypes = {
    enabled: "Boolean",
    speed: "Number"
  };

  constructor (speed = 1) {
    super();
    this.enabled = true;
    this.speed = speed;
  }

  update () {
    if (!this.enabled) { return; }
    const speed = this.speed;
    const pos = this.deps.Position;
    pos.x += (Math.random() * (speed * 2)) - speed;
    pos.y += (Math.random() * (speed * 2)) - speed;
  }

}

export default Wander;
