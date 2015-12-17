/*global PIXI:false*/
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

  constructor (color = "#800", assetName, image, opacity = 1) {
    super();
    this.renderer = Env.game.renderer;
    this.enabled = true;
    this.color = color;
    this.assetName = assetName;
    this.image = image ? image : "";
    this.opacity = opacity;

    // TODO: should not be in component - should be in system.
    if (image) {
      if (!PIXI.loader.resources[assetName]) {
        window.PIXI.loader.add(assetName, `../../assets/images/${image}`);
        window.PIXI.loader.once("complete", () => {
          //this.addToScene();
        });
      }
    }
  }

  start () {
    super.start();
    // Nope... this could be called before asset loaded
    this.ref = this.renderer.add(this);
  }

  update () {
    // update now moved to rendere system
    // const {dom, color, image, enabled, opacity} = this;
  }

  remove () {
    this.renderer.remove(this.ref);
  }

}

export default Renderer;
