/**
 * Created by pandan on 2017-07-20.
 */
export default class ParticleObjectsManager {

  constructor() {
    this.notActive = [];
    this.objectIndex = 0;
  }

  addObject(object) {
    this.notActive.push(object);
    this.objectIndex++;
  }

  removeObject(object) {
    this.notActive.splice(this.getObjectIndex(object), 1);
    object.destroy();
  }

  getObjectIndex(obj) {
    for (let i = 0; i < this.notActive.length; i++) {
      if (obj.id === this.notActive[i].id) {
        return i;
      }
    }
    return null;
  }

  update() {
    for (let i = this.notActive.length - 1; i >= 0; i--) {
      this.notActive[i].update();
    }
  }

}
