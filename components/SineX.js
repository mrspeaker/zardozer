import Component from "./Component";

class SineX extends Component {

  constructor (freq = 0.4, amp = 2) {
    super();
    this.name = "SineX";
    this.freq = freq;
    this.amp = amp;
    this.time = 0;
  }

  start () {
    this.pos = this.getComponent("Position");
  }

  update (dt) {
    this.time += dt;
    this.pos.x += Math.sin(this.time / this.freq) * this.amp;
  }

}

SineX.propTypes = {
  freq: "Number",
  amp: "Number"
};

export default SineX;
