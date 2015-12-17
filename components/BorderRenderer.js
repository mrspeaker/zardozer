import Component from "./Component";

class BorderRenderer extends Component {

  static deps = ["DOMRenderer"];
  static propTypes = {
    enabled: "Boolean"
  }

  _lastEnabled;

  constructor () {
    super();
    this.enabled = true;
  }

  start () {
    super.start();

    const {DOMRenderer} = this.deps;
    DOMRenderer.dom.style.border = "1px solid red";

  }

  update () {
    const {enabled, _lastEnabled} = this;
    if (_lastEnabled != enabled) {
      const {dom} = this.deps.DOMRenderer;
      dom.style.border = enabled ? "1px solid red" : "none";
      this._lastEnabled = enabled;
    }
  }

  remove () {

  }

}

export default BorderRenderer;
