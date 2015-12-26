import Component from "./Component";
import Env from "../Env";

class Renderer extends Component {

  ref = null;

  static deps = ["Position"];
  static propTypes = {
    enabled: "Boolean",
    color: "Color",
    assetName: "String",
    image: "Image",
    opacity: "Number"
  };

  constructor (color = "#800", assetName, image = "", opacity = 1) {
    super();
    this.renderer = Env.game.systems["renderer"];
    this.enabled = true;
    this.color = color;
    this.assetName = assetName;
    this.image = image;
    this.opacity = opacity;
  }

  start () {
    super.start();
    this.ref = this.renderer.add(this, this.entity.parent);
  }

  remove () {
    this.renderer.remove(this.ref);
  }

}

export default Renderer;
