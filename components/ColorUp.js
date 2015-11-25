import Component from "./Component";

class ColorUp extends Component {

  constructor (rate = 1) {
    super();
    this.name = "ColorUp";
    this.enabled = true;
    this.rate = rate;
    this.time = 0;
  }

  update (dt) {
    if (!this.enabled) { return; }

    this.time += dt;
    if (this.time > this.rate) {
      this.time -= this.rate;

      // booo!
      const rend = this.getComponent("Renderer");
      rend.color = "hsl(" + (Math.random() * 360 | 0) + ", 50%, 50%)";
    }
  }
}

ColorUp.propTypes = {
  enabled: "Boolean",
  rate: "Number"
};

export default ColorUp;
