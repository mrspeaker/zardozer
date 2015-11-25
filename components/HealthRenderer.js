import Component from "./Component";
import Renderer from "./Renderer";

class HealthRenderer extends Renderer {

  constructor (color = "#800", size = 24) {
    super(color, size);
    this.name = "HealthRenderer";
  }

  start () {
    super.start();
    this.health = this.getComponent("Health");
  }

  update () {
    super.update();
    if (this.health) {
      const amount = this.health.amount;
      this.dom.textContent = amount > 0 ? Math.floor(amount) : "X";
    }
  }

}

HealthRenderer.propTypes = {
  color: "Color",
  size: "Number"
};

export default HealthRenderer;
