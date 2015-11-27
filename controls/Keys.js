import $ from "jQuery";
import Env from "../Env";

// Could be regular ol' component?

class Keys {

  keys = {};
  downKeys = [];

  constructor () { }

  init () {
    $(Env.game.container).on("keydown", ({which}) => {
      if (!this.keys[which]) {
        this.keys[which] = {};
      }
      const k = this.keys[which];
      k.down = true;
      k.pressed = true;
      this.downKeys.push(k);
    });

    $(Env.game.container).on("keyup", ({which}) => {
      const k = this.keys[which];
      if (!k) { return; }
      k.down = false;
    });
  }

  isDown (keyCode) {
    if (!this.keys[keyCode]) return false;
    return !!this.keys[keyCode].down;
  }

  pressed (keyCode) {
    if (!this.keys[keyCode]) return false;
    return !!this.keys[keyCode].pressed;
  }

  update () {
    // Unset "wasDown" flag
    this.downKeys = this.downKeys.filter(k => {
      k.pressed = false;
      return false;
    });
  }
}

const keys = new Keys();

export default keys;
