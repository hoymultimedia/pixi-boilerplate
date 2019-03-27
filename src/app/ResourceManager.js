import { loaders, AnimatedSprite, Sprite } from 'pixi.js';
import Signal from 'mini-signals';

let _instance = null;

export default class ResourceManager {

  static get instance() {
    if (!_instance) {
      _instance = new ResourceManager();
    }
    return _instance;
  }

  constructor() {
    this.onComplete = new Signal();
  }

  load() {
    this.loader = new loaders.Loader();
    /**
     * Add texturepacker sheet below
     */
    this.loader.add('assets/sheets/sheet.json');
    this.loader.add({ name: 'fnt', url: './assets/bmpFonts/roboto-regular@2x.fnt' });

    this.loader.onComplete.add((loader, resources) => {
      /**
       * Remember we are only handling one single sheet.
       */
      this.sheet = resources['assets/sheets/sheet.json'];
      this.onComplete.dispatch();
    });
    this.loader.load();
  }

  getTexture(id) {
    return this.sheet.textures[id];
  }

  getSprite(id) {
    return new Sprite(this.sheet.textures[id]);
  }

  getAnimatedSprite(id) {
    return new AnimatedSprite(this.sheet.animations[id]);
  }

}
