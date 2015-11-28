import Component from "./Component";
import Env from "../Env";

class Renderer extends Component {

  static deps = ["Position"];
  static propTypes = {
    color: "Color",
    size: "Number",
    image: "Image"
  };

  _lastColor;
  _lastSize;
  _lastImage = null;

  constructor (color = "#800", size = 24, image) {
    super();
    this.color = color;
    this.size = size;
    this.image = image ? image : "";
  }

  start () {
    super.start();
    const dom = document.createElement("div");
    dom.style.position = "absolute";
    Env.game.container.appendChild(dom);
    this.dom = dom;
  }

  update () {
    const {dom, color, size, image, _lastColor, _lastSize, _lastImage} = this;
    const pos = this.deps.Position;

    if (!dom) {
      console.warn("no dom", this.entity);
      return;
    }
    if (_lastColor !== color) {
      dom.style.backgroundColor = color;
      this._lastColor = color;
    }
    if (_lastSize !== size) {
      dom.style.backgroundColor = color;
      dom.style.width = size + "px";
      dom.style.height = size + "px";
      this._lastSize = size;
    }
    if (_lastImage !== image) {
      if (Env.images.find(i => i === image)) {
        dom.style.backgroundImage = `url(../assets/images/${image})`;
      }
      this._lastImage = image;
      // Circl-y if no image.
      dom.style.borderRadius = image === "" ? (size / 2) + "px" : 0;
    }
    dom.style.left = pos.x + "px";
    dom.style.top = pos.y + "px";
  }

  remove () {
    if (this.dom) {
      Env.game.container.removeChild(this.dom);
    }
  }

}

export default Renderer;
