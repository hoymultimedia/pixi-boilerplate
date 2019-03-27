import {
  World, Bodies, Body, Svg, Vertices,
} from 'matter-js';
import App from 'app/App';

export default class MatterBody {
  constructor() {
    this.engine = App.instance.engine;
    this.world = this.engine.world;
  }

  addCircleBody(circle, options) {
    this.body = Bodies.circle(
      circle.x,
      circle.y,
      circle.radius,
      options,
    );
    this.addBody();
  }

  addRectBody(rect, options) {
    this.body = Bodies.rectangle(
      rect.x,
      rect.y,
      rect.width,
      rect.height,
      options,
    );
    this.addBody();
  }

  addSVGBody(position, options, svgString, scale = 1) {
    const parser = new DOMParser();
    const svgObj = parser.parseFromString(svgString, 'image/svg+xml');
    const vertexSets = [];
    const paths = svgObj.getElementsByTagName('path');
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const points = Svg.pathToVertices(path, 15);
      vertexSets.push(Vertices.scale(points, scale, scale));
    }
    this.body = Bodies.fromVertices(position.x, position.y, vertexSets, options, true);

    this.addBody();
  }

  applyForce(angle, force = 1) {
    const velocity = {
      x: Math.cos(angle) * force,
      y: Math.sin(angle) * force,
    };
    Body.setAngle(this.body, angle);
    Body.setVelocity(this.body, velocity);
  }

  removeBody() {
    World.remove(this.world, [this.body]);
  }

  addBody() {
    World.add(this.world, [this.body]);
  }

  setPos(pos) {
    Body.setPosition(this.body, pos);
  }

  update() {
  }

  /**
   * Getter & Setters
   */
  set x(value) {
    Body.setPosition(this.body, { x: value, y: this.body.position.y });
  }

  get x() {
    return this.body.position.x;
  }

  set y(value) {
    Body.setPosition(this.body, { x: this.body.position.x, y: value });
  }

  get y() {
    return this.body.position.y;
  }
}
