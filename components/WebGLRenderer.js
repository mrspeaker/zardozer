import Component from "./Component";
import Env from "../Env";

class WebGLRenderer extends Component {

  static deps = ["Position"];
  static propTypes = {
    enabled: "Boolean",
    color: "Color",
    name: "String",
    image: "Image",
    opacity: "Number"
  };

  constructor (color = "#800", name, image, opacity = 1) {
    super();
    this.renderer = Env.game.renderer;
    this.enabled = true;
    this.color = color;
    this.name = name;
    this.image = image ? image : "";
    this.opacity = opacity;


    if (image && !PIXI.loader.resources[name]) {
      console.log("Add", name, PIXI.loader);
      window.PIXI.loader.add(name, `../../assets/images/${image}`);
      window.PIXI.loader.once('complete', (o,a) => console.log(o, a));
    }
  }

  start () {
    super.start();

    this.sprite = new PIXI.Sprite();
  }

  update () {
//    const {dom, color, image, enabled, opacity} = this;
    //const pos = this.deps.Position;

    //const {x, y, w, h, z} = pos;

  }

  remove () {

  }

}

export default WebGLRenderer;
