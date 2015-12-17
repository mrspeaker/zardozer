/*global PIXI:false*/
import Component from "./Component";
import Env from "../Env";

class WebGLRenderer extends Component {

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

    if (image) {
      if (!PIXI.loader.resources[assetName]) {
        window.PIXI.loader.add(assetName, `../../assets/images/${image}`);
        window.PIXI.loader.once("complete", () => {
          //this.addToScene();
        });
      }
    }
  }

  addToScene () {
    const sprite = new PIXI.Sprite(PIXI.loader.resources[this.assetName].texture);
    sprite.position.x = Math.random() * 50;
    sprite.position.y = Math.random() * 20;
    this.renderer.add(sprite);
    this.sprite = sprite;
  }

  start () {
    super.start();
    this.addToScene();
  }

  update () {
    // const {dom, color, image, enabled, opacity} = this;
    const {sprite} = this;
    if (!sprite) {
      return;
    }
    const pos = this.deps.Position;
    const {x, y} = pos;
    if (!sprite.position) {
      console.log("no what?");
      console.log(sprite);
    }
    sprite.position.x = x;
    sprite.position.y = y;

  }

  remove () {
    this.renderer.remove(this.sprite);
  }

}

export default WebGLRenderer;
