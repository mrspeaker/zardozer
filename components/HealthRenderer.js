import Component from "./Component";

class HealthRenderer extends Component {

  constructor () {
    super();
    this.name = "HealthRenderer";
  }

  start () {
    this.health = this.getComponent("Health");
    this.renderer = this.getComponent("Renderer");
  }

  update () {
    if (this.health) {
      const amount = this.health.amount;
      this.renderer.dom.textContent = amount > 0 ? Math.floor(amount) : "X";
    }
  }

}

export default HealthRenderer;
