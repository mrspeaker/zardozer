import Component from "./Component";
import Env from "../Env";

class Renderer extends Component {

  constructor (color = "#800", size = 24) {
    super();
    this.name = "Renderer";
    this.color = color;
    this.size = size;
    this._lastColor;
    this._lastSize;
  }

  start () {
    const dom = document.createElement("div");
    dom.style.position = "absolute";
    Env.game.container.appendChild(dom);
    this.dom = dom;

    this.pos = this.getComponent("Position");
  }

  update () {
    const {dom, pos, color, size, _lastColor, _lastSize} = this;
    if (_lastColor !== color) {
      dom.style.backgroundColor = color;
      this._lastColor = color;
    }
    if (_lastSize !== size) {
      dom.style.backgroundColor = color;
      dom.style.width = size + "px";
      dom.style.height = size + "px";
      dom.style.borderRadius = (size / 2) + "px";
      this._lastSize = size;
    }
    dom.style.left = pos.x + "px";
    dom.style.top = pos.y + "px";
  }

  remove () {
    Env.game.container.removeChild(this.dom);
  }

}

Renderer.propTypes = {
  color: "Color"
};

export default Renderer;
