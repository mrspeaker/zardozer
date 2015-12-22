/* global PIXI:false */

class DebugRenderer {

  constructor (w, h, container) {
    this.renderer = new PIXI.WebGLRenderer(w, h);
    this.stage = new PIXI.Container();
    container.appendChild(this.renderer.view);

    this.drawHierachy();
  }

  drawHierachy (tree, x, y) {
    const e = new PIXI.Ellipse(20, 20, 30, 10);
    console.log(e);

  }

  update () {
    this.renderer.render(this.stage);
  }

}

export default DebugRenderer;
