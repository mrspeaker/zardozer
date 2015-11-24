import Component from "./Component";

class ColorUp extends Component {

  constructor (rate = 1) {
    super();
    this.name = "ColorUp";
    this.rate = rate;
    this.time = 0;
  }

  update (dt) {
    this.time += dt;
    if (this.time > this.rate) {
      this.time -= this.rate;

      // booo!
      const rend = this.getComponent("HealthRenderer") || this.getComponent("Renderer");
      rend.color = "hsl(" + (Math.random() * 360 | 0) + ", 50%, 50%)";
    }
  }
}

ColorUp.propTypes = {
  rate: "Number"
};

export default ColorUp;
