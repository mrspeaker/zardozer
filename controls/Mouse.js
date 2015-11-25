import $ from "jQuery";

// Could be regular ol' component?

class Mouse {
  constructor () {
    this.down = false;
    this.pressed = false;
    this.released = false;
  }

  init () {
    $("#game").on("mousedown", () => {
      this.down = true;
      this.pressed = true;
    });

    $("#game").on("mouseup", () => {
      this.down = false;
      this.released = true;
    });
  }

  update () {
    if (this.pressed) {
      this.pressed = false;
      this.released = false;
    }
  }
}

const mouse = new Mouse();

export default mouse;
