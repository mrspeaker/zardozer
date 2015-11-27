import $ from "jQuery";
import Env from "../Env";

// Could be regular ol' component?

class Keys {

  keys = {};

  constructor () {

  }

  init () {
    $(Env.game.container).on("keydown", ({which}) => {
      this.keys[which] = true;
    });

    $(Env.game.container).on("keyup", ({which}) => {
      this.keys[which] = false;
    });
  }

  isDown (keyCode) {
    return !!this.keys[keyCode];
  }

  update () {

  }
}

const keys = new Keys();

export default keys;
