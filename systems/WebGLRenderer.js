import SystemComponent from "./SystemComponent";
const {PIXI} = window;

class WebGLRenderer extends SystemComponent {

  constructor () {
    super();

    this.renderer = new PIXI.WebGLRenderer(800, 600);
    this.stage = new PIXI.Container();
    document.body.appendChild(this.renderer.view);
  }

  onLoad (cb) {
    PIXI.loader.load((loader, resources) => cb(resources));
  }

  load (name, path) {
    PIXI.loader.add(name, path);
  }

  add (e) {
    this.stage.addChild(e);
  }

  remove (e) {
    this.stage.removeChild(e);
  }

  update () {
    this.renderer.render(this.stage);
  }
}

export default WebGLRenderer;
