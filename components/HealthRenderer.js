import Component from "./Component";
import Renderer from "./Renderer";

class HealthRenderer extends Renderer {

  constructor (color = "#800") {
    super(color);
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
  color: "Color"
};

export default HealthRenderer;
