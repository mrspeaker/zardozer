import Component from "./Component";

class LifeRenderer extends Component {

  static deps = ["documentRenderer", "Life"];

  update () {
    const {DOMRenderer, Life} = this.deps;
    if (!DOMRenderer) { return; }
    DOMRenderer.dom.textContent = Math.floor(Life.time * 10);
  }

}

export default LifeRenderer;
