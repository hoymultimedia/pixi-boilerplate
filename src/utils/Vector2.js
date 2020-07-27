class Vector2 {
  // Constructor
  constructor(inX, inY) {
    if (typeof inX !== 'number') throw new Error('Invalid x value.');
    if (typeof inY !== 'number') throw new Error('Invalid y value.');

    // Store the (x, y) coordinates
    this.x = inX;
    this.y = inY;
  }

  /**
   * Add another Vector2 to this Vector2.
   * @param	{Vector2}	v	The Vector2 to add.
   * @return	{Vector2}	The current Vector2. useful for daisy-chaining calls.
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  /**
   * Take another Vector2 from this Vector2.
   * @param  {Vector2} v The Vector2 to subtrace from this one.
   * @return {Vector2}   The current Vector2. useful for daisy-chaining calls.
   */
  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  /**
   * Divide the current Vector2 by a given value.
   * @param  {Number|Vector2} value The number (or Vector2) to divide by.
   * @return {Vector2}	   The current Vector2. Useful for daisy-chaining calls.
   */
  divide(value) {
    if (value instanceof Vector2) {
      this.x /= value.x;
      this.y /= value.y;
    } else if (typeof value === 'number') {
      this.x /= value;
      this.y /= value;
    } else throw new Error("Can't divide by non-number value.");

    return this;
  }

  /**
   * Multiply the current Vector2 by a given value.
   * @param  {Number|Vector2} value The number (or Vector2) to multiply the current Vector2 by.
   * @return {Vector2}	   The current Vector2. useful for daisy-chaining calls.
   */
  multiply(value) {
    if (value instanceof Vector2) {
      this.x *= value.x;
      this.y *= value.y;
    } else if (typeof value === 'number') {
      this.x *= value;
      this.y *= value;
    } else throw new Error("Can't multiply by non-number value.");

    return this;
  }

  /**
   * Move the Vector2 towards the given Vector2 by the given amount.
   * @param  {Vector2} v      The Vector2 to move towards.
   * @param  {Number} amount The distance to move towards the given Vector2.
   */
  moveTowards(v, amount) {
    // From http://stackoverflow.com/a/2625107/1460422
    const dir = new Vector2(v.x - this.x, v.y - this.y).limitTo(amount);
    this.x += dir.x;
    this.y += dir.y;

    return this;
  }

  /**
   * Rounds the x and y components of this Vector2 down to the next integer.
   * @return	{Vector2}	This Vector2 - useful for diasy-chaining.
   */
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);

    return this;
  }

  /**
   * Rounds the x and y components of this Vector2 up to the next integer.
   * @return	{Vector2}	This Vector2 - useful for diasy-chaining.
   */
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);

    return this;
  }

  /**
   * Rounds the x and y components of this Vector2 to the nearest integer.
   * @return	{Vector2}	This Vector2 - useful for diasy-chaining.
   */
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);

    return this;
  }

  /**
   * Calculates the 'area' of this Vector2 and returns the result.
   * In other words, returns x * y. Useful if you're using a Vector2 to store
   * a size.
   * @return {Number} The 'area' of this Vector2.
   */
  area() {
    return this.x * this.y;
  }

  /**
   * Snaps this Vector2 to an imaginary square grid with the specified sized
   * squares.
   * @param	{Number}	gridSize	The size of the squares on the imaginary  grid to which to snap.
   * @return	{Vector2}	The current Vector2 - useful for daisy-chaining.
   */
  snapTo(gridSize) {
    this.x = Math.floor(this.x / gridSize) * gridSize;
    this.y = Math.floor(this.y / gridSize) * gridSize;

    return this;
  }

  /**
   * Limit the length of the current Vector2 to value without changing the
   * direction in which the Vector2 is pointing.
   * @param  {Number} value The number to limit the current Vector2's length to.
   * @return {Vector2}	   The current Vector2. Useful for daisy-chaining calls.
   */
  limitTo(value) {
    if (typeof value !== 'number')
      throw new Error("Can't limit to non-number value.");

    if (this.length > value) {
      this.divide(this.length);
      this.multiply(value);
    }

    return this;
  }

  /**
   * Like limitTo(), but explicitly sets the length of the Vector2 without changing the direction.
   * In other words, it acts like limitTo, but also scales up small Vector2s to match the specified length.
   * @param	{Number}	value	The length to set the Vector2 to.
   */
  setTo(value) {
    if (typeof value !== 'number')
      throw new Error("Can't limit to non-number value.");

    this.divide(this.length);
    this.multiply(value);

    return this;
  }

  /**
   * Return the dot product of the current Vector2 and another Vector2.
   * @param  {Vector2} v   The other Vector2 we should calculate the dot product with.
   * @return {Vector2}	 The current Vector2. Useful for daisy-chaining calls.
   */
  dotProduct(v) {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Calculate the angle, in radians, from north to another Vector2.
   * @param	{Vector2}	v	The other Vector2 to which to calculate the angle.
   * @return	{Vector2}	The current Vector2. Useful for daisy-chaining calls.
   */
  angleFrom(v) {
    // From http://stackoverflow.com/a/16340752/1460422
    let angle = Math.atan2(v.y - this.y, v.x - this.x);
    angle += Math.PI / 2;
    if (angle < 0) angle += Math.PI * 2;
    return angle;
  }

  /**
   * Clones the current Vector2.
   * @return {Vector2} A clone of the current Vector2. Very useful for passing around copies of a Vector2 if you don't want the original to be altered.
   */
  clone() {
    return new Vector2(this.x, this.y);
  }

  /*
   * Returns a representation of the current Vector2 as a string.
   * @returns {string} A representation of the current Vector2 as a string.
   */
  toString() {
    return `(${this.x}, ${this.y})`;
  }

  /**
   * Whether the Vector2 is equal to another Vector2.
   * @param  {Vector2} v The Vector2 to compare to.
   * @return {boolean}  Whether the current Vector2 is equal to the given Vector2.
   */
  equalTo(v) {
    return this.x === v.x && this.y === v.y;
  }

  /**
   * Get the unit Vector2 of the current Vector2 - that is a Vector2 poiting in the same direction with a length of 1. Note that this does *not* alter the original Vector2.
   * @return {Vector2} The current Vector2's unit form.
   */
  get unitVector2() {
    const { length } = this;
    return new Vector2(this.x / length, this.y / length);
  }

  /**
   * Get the length of the current Vector2.
   * @return {Number} The length of the current Vector2.
   */
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Get the value of the minimum component of the Vector2.
   * @return {Number} The minimum component of the Vector2.
   */
  get minComponent() {
    if (Math.abs(this.x) < Math.abs(this.y)) return this.x;
    return this.y;
  }

  /**
   * Get the value of the maximum component of the Vector2.
   * @return {Number} The maximum component of the Vector2.
   */
  get maxComponent() {
    if (Math.abs(this.x) > Math.abs(this.y)) return this.x;
    return this.y;
  }

  /**
   * Returns a new Vector2 based on an angle and a length.
   * @param	{Number}	angle	The angle, in radians.
   * @param	{Number}	length	The length.
   * @return	{Vector2}	A new Vector2 that represents the (x, y) of the specified angle and length.
   */
  static fromBearing(angle, length) {
    return new Vector2(length * Math.cos(angle), length * Math.sin(angle));
  }
}

Vector2.zero = new Vector2(0, 0);
Vector2.one = new Vector2(1, 1);

export default Vector2;
