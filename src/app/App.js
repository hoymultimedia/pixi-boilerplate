import { Application, Sprite, Texture } from 'pixi.js';
import * as PIXI from 'pixi.js';
import GameStats from 'gamestats.js';
import debounce from 'utils/debounce';
import appStore from './appStore';
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
      backgroundColor: 0xededed,
    });
    appStore.width = this.width;
    appStore.height = this.height;
    appStore.app = this.app;
    this.htmlElement.appendChild(this.app.view);
    this.display = this.app.stage;
  }

  setupStats() {
    this.stats = new GameStats();
    this.stats.enableExtension('pixi', [PIXI, this.app]);

    document.body.appendChild(this.stats.dom);
    this.stats.dom.style.top = 'calc(100% - 240px)';
    this.stats.dom.style.left = '0%';
  }

  setupLoading() {
    const resources = new Resources(this.app);
    resources.onLoaded.add(() => {
      this.start();
    });
  }

  start() {
    const circle = new Sprite(Texture.from('circle.png'));
    circle.x = (this.width - circle.width) / 2;
    circle.y = (this.height - circle.height) / 2;
    this.display.addChild(circle);
    this.app.ticker.add(() => {
      this.update();
    });
  }

  update() {
    this.stats.begin();

    // update stuff

    this.stats.end();
  }

  onResize = debounce(() => {
    const parent = this.app.view.parentNode;
    if (this.app) {
      this.app.renderer.resize(parent.clientWidth, parent.clientHeight);
    }
  }, 150);
}
