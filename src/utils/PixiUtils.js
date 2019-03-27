import { Graphics } from 'pixi.js';

export default class PixiUtils {

  static createButton(w, h, color = 0xCCCCCC) {
    const button = new Graphics();
    button.buttonMode = true;
    button.interactive = true;
    button.beginFill(color);
    button.lineStyle(1, 0x000000);
    button.drawRect(0, 0, w, h);
    button.endFill();
    return button;
  }

}
