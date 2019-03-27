/**
 * Created by pandan on 2017-05-20.
 */
import MathUtils from './MathUtils';

export default class Utils {

  static propName(prop, value) {
    let res = null;
    /* eslint-disable */
    for (const i in prop) {
      if (typeof prop[i] === 'object') {
        if (this.propName(prop[i], value)) {
          return res;
        }
      } else if (prop[i] === value) {
        res = i;
        return res;
      }
    }
    /* eslint-enable */
    return res;
  }

  static getRandomItem(list) {
    return list[MathUtils.getRandomInt(0, list.length - 1)];
  }

  static removeItem(array, item) {
    return array.filter(e => e !== item);
  }
}
