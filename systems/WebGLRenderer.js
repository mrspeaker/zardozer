import SystemComponent from "./SystemComponent";
const {PIXI} = window;

class WebGLRenderer extends SystemComponent {

  sprites = [];

  constructor () {
    super();

    this.renderer = new PIXI.WebGLRenderer(800, 600);
    this.stage = new PIXI.Container();
    document.body.appendChild(this.renderer.view);
  }

  onLoad (cb) {
    PIXI.loader.load((loader, resources) => cb(resources));
  }

  loadAsset (name, path) {
    if (PIXI.loader.resources[name]) {
      return;
    }
    PIXI.loader.add(name, `../../assets/images/${path}`);
  }

  loadAssets (assetMap) {
    assetMap.forEach((path, name) => this.loadAsset(name, path));
  }

  add (e) {
    const sprite = new PIXI.Sprite(PIXI.loader.resources[e.assetName].texture);
    sprite.position.x = Math.random() * 50;
    sprite.position.y = Math.random() * 20;

    sprite._entity = e;
    this.sprites.push(sprite);
    this.stage.addChild(sprite);
    return sprite;
  }

  remove (e) {
    const idx = this.sprites.indexOf(e);
    if (idx >= 0) {
      this.sprites.splice(idx, 1);
    }
    this.stage.removeChild(e);
  }

  update () {
    this.sprites.forEach(s => {
      // Update each sprite
      const pos = s._entity.deps.Position;
      const {x, y} = pos;
      s.position.x = x;
      s.position.y = y;
    });
    this.renderer.render(this.stage);
  }

  zSort () {
    console.log("zsort. sprite len:", this.sprites.length);
    this.stage.children.sort((a, b) => {
      const z1 = a._entity.deps.Position.z;
      const z2 = b._entity.deps.Position.z;
      return z1 - z2;
    });
  }
}

export default WebGLRenderer;
