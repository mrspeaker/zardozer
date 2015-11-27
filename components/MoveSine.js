import Component from "./Component";

class MoveSine extends Component {

  static deps = ["Position"];
  static propTypes = {
    axis: "String",
    freq: "Number",
    amp: "Number"
  };

  time = 0;

  constructor (axis = "x", freq = 0.4, amp = 2) {
    super();
    this.axis = axis === "y" ? "y" : "x";
    this.freq = freq;
    this.amp = amp;
  }

  update (dt) {
    this.time += dt;
    this.deps.Position[this.axis] += Math.sin(this.time / this.freq) * this.amp;
  }

}

export default MoveSine;
