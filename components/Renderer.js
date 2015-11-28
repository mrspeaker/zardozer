import Component from "./Component";
import Env from "../Env";

class Renderer extends Component {

  static deps = ["Position"];
  static propTypes = {
    color: "Color",
    image: "Image"
  };

  _lastColor;
  _lastW;
  _lastH;
  _lastImage = null;

  constructor (color = "#800", image) {
    super();
    this.color = color;
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
    const {dom, color, image, _lastColor, _lastImage, _lastW, _lastH} = this;
    const {x, y, w, h} = this.deps.Position;

    if (!dom) {
      console.warn("no dom", this.entity);
      return;
    }
    if (_lastColor !== color) {
      dom.style.backgroundColor = color;
      this._lastColor = color;
    }
    if (_lastW !== w || _lastH !== h) {
      dom.style.width = w + "px";
      dom.style.height = h + "px";
      this._lastW = w;
      this._lastH = h;
    }
    if (_lastImage !== image) {
      if (!image) {
        dom.style.backgroundImage = "";
      } else if (Env.images.find(i => i === image)) {
        dom.style.backgroundImage = `url(../assets/images/${image})`;
      }
      this._lastImage = image;
      // Circl-y if no image.
      dom.style.borderRadius = image === "" ? (w / 2) + "px" : 0;
    }
    dom.style.left = x + "px";
    dom.style.top = y + "px";
  }

  remove () {
    if (this.dom) {
      Env.game.container.removeChild(this.dom);
    }
  }

}

export default Renderer;
