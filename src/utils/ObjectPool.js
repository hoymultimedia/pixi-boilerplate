/**
 * Created by pandan on 2017-07-20.
 */
export default class ObjectPool {

  constructor() {
    this.notActive = [];
  }

  borrowObject() {
    const obj = this.notActive.shift();
    return obj;
  }

  returnObject(object) {
    this.notActive.push(object);
  }
}
