import Component from './Component';

class Renderer extends Component {

  constructor (color = "#800") {
    super();
    this.name = "Renderer";
    this.color = color;
    this._lastColor = color;
  }

  start () {
    const dom = document.createElement("div");
    dom.style.position = "absolute";
    dom.style.width = "24px";
    dom.style.height = "24px";
    dom.style.backgroundColor = this.color;
    dom.style.borderRadius = "12px";
    document.body.appendChild(dom);

    this.dom = dom;
    this.pos = this.getComponent("Position");
  }

  update () {
    if (this._lastColor !== this.color) {
      this.dom.style.backgroundColor = this.color;
      this._lastColor = this.color;
    }
    this.dom.style.left = this.pos.x + "px";
    this.dom.style.top = this.pos.y + "px";
  }

  remove () {
    document.body.removeChild(this.dom);
  }

}

export default Renderer;
