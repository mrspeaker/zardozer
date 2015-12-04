import Component from "./Component";

class BorderRenderer extends Component {

  static deps = ["Renderer"];

  start () {
    super.start();

    const {Renderer} = this.deps;
    Renderer.dom.style.border = "1px solid red";

  }

  remove () {

  }

}

export default BorderRenderer;
