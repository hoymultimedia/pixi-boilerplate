import { Application } from 'pixi.js';
import Stats from 'stats.js';
import ResourceManager from 'app/ResourceManager';

let _instance = null;

export default class App {
  static get instance() {
    if (!_instance) {
      _instance = new App();
    }
    return _instance;
  }

  init(element) {
    this.appElement = element;
    this.width = element.clientWidth;
    this.height = element.clientHeight;
    this.pixiApp = new Application(
      this.width,
      this.height,
      {
        backgroundColor: 0xededed,
        antialias: true,
        resolution: window.devicePixelRatio,
        autoResize: true,
      },
    );
    element.appendChild(this.pixiApp.view);
    this.stage = this.pixiApp.stage;

    this.setupStats();

    /**
     * Setting up ResourceManager.
     * Resources are specified in ResourceManager class.
     */
    ResourceManager.instance.onComplete.add(() => {
      this.loadComplete();
    });
    ResourceManager.instance.load();

    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  onResize() {
    this.width = this.appElement.clientWidth;
    this.height = this.appElement.clientHeight;
    this.pixiApp.renderer.resize(this.width, this.height);
  }

  loadComplete() {
    this.onResize();
    this.start();
  }

  setupStats() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    this.appElement.appendChild(this.stats.dom);
  }

  start() {
    this.pixiApp.ticker.add((delta) => {
      if (this.stats) {
        this.stats.end();
        this.update(delta);
        this.stats.begin();
      }
    });
  }

  update() {
  }
}
