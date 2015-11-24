import Component from './Component';

class State extends Component {

  constructor (state) {
    super();
    this.name = "State";
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
