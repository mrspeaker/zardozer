import Component from "./Component";

class LifeRenderer extends Component {

  static deps = ["Renderer", "Life"];

  update () {
    const {Renderer, Life} = this.deps;
    Renderer.dom.textContent = Math.floor(Life.time * 10);
  }

}

export default LifeRenderer;
