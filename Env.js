import {EventEmitter} from "Events";
import images from "./assets/images";

const events = new EventEmitter();

const Env = {
  game: null,
  events,
  images
};

export default Env;
