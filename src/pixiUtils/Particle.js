/**
 * Created by pandan on 2017-04-25.
 */
export default class Particle {

  constructor(x, y, speed = 1, direction = 0, gravity = 0) {
    this.x = x;
    this.y = y;
    // Velocity
    this.vx = Math.cos(direction) * speed;
    this.vy = Math.sin(direction) * speed;
    this.gravity = gravity;

    this.speed = speed;
    this.mass = 1;
    this.radius = 0;
    this.bounce = -1;
    this.friction = 1; // Normalized value.
    this.width = null;
    this.height = null;
  }

  set direction(direction) {
    this.vx = Math.cos(direction) * this.speed;
    this.vy = Math.sin(direction) * this.speed;
  }

  get pos() {
    return { x: this.x, y: this.y };
  }

  accelerate(ax, ay) {
    this.vx += ax;
    this.vy += ay;
  }

  update() {
    // Add friction
    this.vx *= this.friction;
    this.vy *= this.friction;
    // Add gravity
    this.vy += this.gravity;
    // Update position
    this.x += this.vx;
    this.y += this.vy;
  }

  angleTo(p2) {
    return Math.atan2(p2.y - this.y, p2.x - this.x);
  }

  distanceTo(p2) {
    const dx = p2.x - this.x;
    const dy = p2.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  gravitateTo(p2) {
    const dx = p2.x - this.x;
    const dy = p2.y - this.y;
    const distSQ = dx * dx + dy * dy;
    const dist = Math.sqrt(distSQ);
    const force = p2.mass / distSQ;
    const ax = dx / dist * force;
    const ay = dy / dist * force;

    this.vx += ax;
    this.vy += ay;
  }

  get hitArea() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

}
