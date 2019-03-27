export default class Angle {
  static normalize(angle) {
    const a = angle % (2 * Math.PI);
    if (a >= 0) {
      return a;
    }
    return a + 2 * Math.PI;
  }

  static reverse(angle) {
    return this.normalize(angle + Math.PI);
  }
}
