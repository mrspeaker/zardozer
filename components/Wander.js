import Component from "./Component";

class Wander extends Component {

  constructor (speed = 1) {
    super();
    this.name = "Wander";
    this.enabled = true;
    this.speed = speed;
  }

  start () {
    this.pos = this.getComponent("Position");
  }

  update () {
    if (!this.enabled) { return; }
    const speed = this.speed;
    this.pos.x += (Math.random() * (speed * 2)) - speed;
    this.pos.y += (Math.random() * (speed * 2)) - speed;
  }

}

Wander.propTypes = {
  enabled: "Boolean",
  speed: "Number"
};

export default Wander;
