import Component from "./Component";

class State extends Component {

  static propTypes = {
    state: "String"
  };

  constructor (state) {
    super();
    this.setState(state);
  }

  setState (state) {
    this.lastState = this.state;
    this.state = state;
    this.time = 0;
    this.frame = 0;
    this.first = true;
  }

  update (dt) {
    if (this.frame++ === 1) {
      this.first = false;
    }
    this.stateTime += dt;
  }

  is (state) {
    return this.state === state;
  }
}

export default State;
