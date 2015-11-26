import Component from "./Component";

class HealthRenderer extends Component {

  static deps = ["Renderer", "Health"];

  update () {
    const {Renderer, Health} = this.deps;
    Renderer.dom.textContent = Math.floor(Health.amount);
  }

}

export default HealthRenderer;
