/* global PIXI:false */
import SystemComponent from "./SystemComponent";

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

  add (e, parent) {
    let sprite;
    if (e.assetName) {
      sprite = new PIXI.Sprite(PIXI.loader.resources[e.assetName].texture);
    } else {
      sprite = new PIXI.Container();
      sprite.position.x = 20;
      sprite.position.y = 80;
    }

    sprite._entity = e;
    this.sprites.push(sprite);

    if (!parent) {
      // Add to stage
      sprite._parent = null;
      this.stage.addChild(sprite);
    } else {
      // Add to parent sprite
      const renderer = parent.getComponent("Renderer");
      renderer.ref.addChild(sprite);
      sprite._parent = renderer.ref;
    }
    return sprite;
  }

  remove (e) {
    const idx = this.sprites.indexOf(e);
    if (idx >= 0) {
      this.sprites.splice(idx, 1);
    }
    const parent = e._parent || this.stage;
    parent.removeChild(e);
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
    this.stage.children.sort((a, b) => {
      const z1 = a._entity.deps.Position.z;
      const z2 = b._entity.deps.Position.z;
      return z1 - z2;
    });
  }
}

export default WebGLRenderer;
