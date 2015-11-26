import Component from "./Component";

class ColorChange extends Component {

  static deps = ["Renderer"];
  static propTypes = {
    enabled: "Boolean",
    rate: "Number"
  };

  time = 0;
  enabled = true;

  constructor (rate = 1) {
    super();
    this.rate = rate;
  }

  update (dt) {
    if (!this.enabled) { return; }

    if ((this.time += dt) > this.rate) {
      this.time -= this.rate;
      this.deps.Renderer.color = "hsl(" + (Math.random() * 360 | 0) + ", 50%, 50%)";
    }
  }
}

export default ColorChange;
