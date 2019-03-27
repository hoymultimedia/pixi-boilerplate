/**
 * Created by pandan on 2017-07-20.
 */
import Signal from 'mini-signals';
import Particle from './Particle';

export default class ParticleObject {

  constructor(x, y, id) {
    this.physics = new Particle(
      x, y,
    );
    this.id = id;
    this.onDestroy = new Signal();
  }

  update() {
    this.physics.update();
  }

  destroy() {
    this.physics = null;
    this.onDestroy.detachAll();
    this.onDestroy = null;
  }
}
