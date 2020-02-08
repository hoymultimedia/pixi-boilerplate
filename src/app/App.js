import { Application } from 'pixi.js';

export default class App {
  constructor(element) {
    this.app = new Application({
      width: 200,
      height: 200,
      autoDensity: true,
      resolution: window.devicePixelRatio,
      backgroundColor: 0xff0099,
    });
    element.appendChild(this.app.view);
  }
}
