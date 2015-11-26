import Component from "./Component";

class State extends Component {

  static propTypes = {
    state: "String"
  };

  constructor (state) {
    super();
    this.state = state;
    this.setState(state);
  }

  setState (state) {
    this.lastState = this.state;
    this.state = state;
    this.stateTime = 0;
    this.first = true;
  }

  update (dt) {
    if (this.stateTime !== 0) {
      this.first = false;
    }
    this.stateTime += dt;
  }
}

export default State;
