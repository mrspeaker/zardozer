import Component from "./Component";

class SineY extends Component {

  constructor (freq = 0.4, amp = 2) {
    super();
    this.name = "SineY";
    this.freq = freq;
    this.amp = amp;
    this.time = 0;
  }

  start () {
    this.pos = this.getComponent("Position");
  }

  update (dt) {
    this.time += dt;
    this.pos.y += Math.sin(this.time / this.freq) * this.amp;
  }

}

SineY.propTypes = {
  freq: "Number",
  amp: "Number"
};

export default SineY;
