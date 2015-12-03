import Component from "./Component";
import Env from "../Env";

class Renderer extends Component {

  static deps = ["Position"];
  static propTypes = {
    enabled: "Boolean",
    color: "Color",
    image: "Image",
    shadow: "Boolean",
    opacity: Number
  };

  _lastColor;
  _lastW;
  _lastH;
  _lastImage = null;
  _lastEnabled;
  _lastOpacity;

  constructor (color = "#800", image, shadow = false, opacity = 1) {
    super();
    this.enabled = true;
    this.color = color;
    this.image = image ? image : "";
    this.shadow = shadow;
    this.opacity = opacity;
  }

  start () {
    super.start();
    const dom = document.createElement("div");
    dom.className = "entity" + (this.shadow ? " entityWithShadow" : "");
    dom.style.position = "absolute";
    dom.setAttribute("data-entity", this.entity.name);
    Env.game.container.appendChild(dom);
    this.dom = dom;
  }

  update () {
    const {dom, color, image, enabled, opacity} = this;
    const {_lastColor, _lastImage, _lastEnabled, _lastOpacity, _lastW, _lastH} = this;
    const pos = this.deps.Position;

    if (!dom) {
      console.warn("no dom", this.entity);
      return;
    }
    const {x, y, w, h, z} = pos;
    if (_lastColor !== color) {
      dom.style.backgroundColor = color;
      this._lastColor = color;
    }
    if (_lastW !== w || _lastH !== h) {
      dom.style.width = w + "px";
      dom.style.height = h + "px";
      this._lastW = w;
      this._lastH = h;
      dom.style.zIndex = z;
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
    if (_lastEnabled != enabled) {
      dom.style.display = enabled ? "block" : "none";
      this._lastEnabled = enabled;
    }
    if (_lastOpacity != opacity) {
      dom.style.opacity = opacity;
      this._lastOpacity = opacity;
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
