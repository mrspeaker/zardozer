import SystemComponent from "./SystemComponent";
const {PIXI} = window;

class WebGLRenderer extends SystemComponent {

  initLoadComplete = false;

  constructor () {
    super();

    this.renderer = new PIXI.WebGLRenderer(800, 600);
    this.stage = new PIXI.Container();
    document.body.appendChild(this.renderer.view);

    // Load assets?
    /*
    PIXI.loader
      .add('bunny', 'assets/images/grass.png')
      .load((loader, resources) => {
        const bunny = new PIXI.Sprite(resources.bunny.texture);

        bunny.position.x = 400;
        bunny.position.y = 300;

        this.stage.addChild(bunny);
      });*/
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

  update () {
    this.renderer.render(this.stage);
  }
}

export default WebGLRenderer;
