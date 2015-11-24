import Entity from './Entity';
import State from '../components/State';
import Health from '../components/Health';
import Wander from '../components/Wander';
import MoveTowards from '../components/MoveTowards';
import HealthRenderer from '../components/HealthRenderer';
import PlayerActor from '../components/PlayerActor';

// This is how you'd make an entity in code...
// but the idea is to be able to do it via data (see makeEntity)

class Player extends Entity {

  constructor (name, x = 0, y = 0) {
    super(name, x, y);

    this.addComponent(new State("BORN"));
    this.addComponent(new Health(100, 0.01));
    this.addComponent(new PlayerActor());
    this.addComponent(new Wander());
    this.addComponent(new MoveTowards("e2"));
    this.addComponent(new HealthRenderer());
  }

}

export default Player;
