import Mouse from '../controls/Mouse';
import Component from './Component';

class PlayerActor extends Component {

  constructor () {
    super();
    this.name = "PlayerActor";
  }

  start () {
    this.state = this.getComponent("State");
  }

  update () {
    if (Mouse.pressed) {
      this.getComponent("Health").amount += 10;
    }
  }

}

export default PlayerActor;
