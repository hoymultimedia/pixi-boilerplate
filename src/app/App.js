import { Application } from 'pixi.js';
import Stats from 'stats.js';
import Resources from './Resources';

export default class App {
  init(htmlElement) {
    this.width = htmlElement.clientWidth;
    this.height = htmlElement.clientHeight;
    this.htmlElement = htmlElement;

    window.addEventListener('resize', this.onResize);
    this.setupApp();
    this.setupStats();
    this.setupLoading();
  }

  setupApp() {
    this.app = new Application({
      width: this.width,
      height: this.height,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio,
      backgroundColor: 0xff0099,
    });
    this.htmlElement.appendChild(this.app.view);
  }

  setupStats() {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  setupLoading() {
    const resources = new Resources(this.app);
    resources.onLoaded.add(() => {
      this.start();
    });
  }

  start() {
    this.app.ticker.add(() => {
      this.update();
    });
  }

  update() {
    this.stats.begin();

    // update stuff

    this.stats.end();
  }

  onResize = () => {
    const parent = this.app.view.parentNode;
    if (this.app) {
      this.app.renderer.resize(parent.clientWidth, parent.clientHeight);
    }
  };
}
