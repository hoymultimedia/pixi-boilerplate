import { Application } from 'pixi.js';
import Resources from './Resources';

export default class App {
  constructor(element) {
    this.width = element.clientWidth;
    this.height = element.clientHeight;

    this.app = new Application({
      width: this.width,
      height: this.height,
      autoDensity: true,
      resolution: window.devicePixelRatio,
      backgroundColor: 0xff0099,
    });
    element.appendChild(this.app.view);

    window.addEventListener('resize', this.onResize);

    const resources = new Resources(this.app);
    resources.onLoaded.add(() => {
      this.start();
    });
  }

  start() {
    console.log('start()', this.app);
  }

  onResize = () => {
    const parent = this.app.view.parentNode;
    console.log('w: ', parent.clientWidth);
    this.app.renderer.resize(parent.clientWidth, parent.clientHeight);
  };
}
