/**
 * Created by pandan on 15/10/16.
 */
export default class MathUtils {

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min;
  }

  static getNewRandomInt(min, max, except) {
    let rndInt = this.getRandomInt(min, max);
    while (rndInt === except) {
      rndInt = this.getRandomInt(min, max);
    }
    return rndInt;
  }

  static getRandomNumber(min, max) {
    return (Math.random() * (max - min)) + min;
  }

  static round(value, decimals) {
    // TODO: Change rounding function.
    // Math.round(number * 100) / 100
    return parseFloat(value.toFixed(decimals));
  }

  /**
   * Work out what percentage value `a` is of value `b` using the given base.
   *
   * @param {number} a - The value to work out the percentage for.
   * @param {number} b - The value you wish to get the percentage of.
   * @param {number} [base=0] - The base value.
   * @return {number} The percentage a is of b, between 0 and 1.
   */
  static getPercentage(a, b, base) {
    let _base = base;
    if (_base === undefined) {
      _base = 0;
    }

    if (a > b || base > b) {
      return 1;
    }
    if (a < base || base > a) {
      return 0;
    }
    return (a - base) / b;
  }

  static linearInterpolation(v, k) {
    const m = v.length - 1;
    const f = m * k;
    const i = Math.floor(f);

    if (k < 0) {
      return this.linear(v[0], v[1], f);
    }

    if (k > 1) {
      return this.linear(v[m], v[m - 1], m - f);
    }

    return this.linear(v[i], v[i + 1 > m ? m : i + 1], f - i);
  }

  static linear(p0, p1, t) {
    return ((p1 - p0) * t) + p0;
  }

  static bezierInterpolation(v, k) {
    let b = 0;
    const n = v.length - 1;

    for (let i = 0; i <= n; i + 1) {
    // eslint-disable-next-line no-restricted-properties
      b += Math.pow(1 - k, n - i) * Math.pow(k, i) * v[i] * this.bernstein(n, i);
    }
    return b;
  }

  static bernstein(n, i) {
    return this.factorial(n) / this.factorial(i) / this.factorial(n - i);
  }

  static factorial(value) {
    if (value === 0) {
      return 1;
    }

    let res = value;
    // eslint-disable-next-line no-plusplus,no-param-reassign
    while (--value) {
      res *= value;
    }
    return res;
  }

  static degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  static radiansTodegrees(radians) {
    return radians * (180 / Math.PI);
  }

  static norm(value, min, max) {
    return (value - min) / (max - min);
  }

  static lerp(norm, min, max) {
    return ((max - min) * norm) + min;
  }

  static map(value, sourceMin, sourceMax, destMin, destMax) {
    const lerpValue = this.lerp(this.norm(value, sourceMin, sourceMax), destMin, destMax);
    return lerpValue;
  }

  static clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  static within(a, b, tolerance) {
    return (Math.abs(a - b) <= tolerance);
  }

  static wrap(value, min, max) {
    const range = max - min;
    if (range <= 0) {
      return 0;
    }

    let result = (value - min) % range;
    if (result < 0) {
      result += range;
    }
    return result + min;
  }

  static wrapAngle(angle, radians) {
    return radians ? this.wrap(angle, -Math.PI, Math.PI) : this.wrap(angle, -180, 180);
  }

  static isEven(n) {
    return n % 2 === 0;
  }

  static isOdd(n) {
    return Math.abs(n % 2) === 1;
  }

}
