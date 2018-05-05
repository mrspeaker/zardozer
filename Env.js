import {EventEmitter} from "events";
import images from "./assets/images";

const events = new EventEmitter();

const Env = {
  game: null,
  events,
  images
};

export default Env;
