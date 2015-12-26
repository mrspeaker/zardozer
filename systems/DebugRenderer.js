/* global PIXI:false */
import SystemComponent from "./SystemComponent";
import Env from "../Env";

class DebugRenderer extends SystemComponent {

  constructor (w, h, container) {
    super(w, h);
    this.renderer = new PIXI.WebGLRenderer(w, h, {
      transparent: true
    });
    this.stage = new PIXI.Container();
    container.appendChild(this.renderer.view);
    this.renderer.view.classList.add("debugRenderer");

    this.drawHierachy();
  }

  drawHierachy (tree, x, y) {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x003300);
    graphics.lineStyle(1, 0x880000);

    // draw a rectangle
    graphics.drawRect(0, 0, 30, 20);
    this.stage.addChild(graphics);
  }

  update () {
    this.renderer.render(this.stage);
  }

}

export default DebugRenderer;
