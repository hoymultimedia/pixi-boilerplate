/**
 * Created by pandan on 04/03/17.
 */
import { Graphics, Sprite, ticker } from 'pixi.js';
import { Strong, VelocityTracker } from 'gsap';
import MiniSignal from 'mini-signals';
import ThrowPropsPlugin from '../../vendor/gsap/src/uncompressed/plugins/ThrowPropsPlugin';
import MathUtils from '../utils/MathUtils';

export default class ThrowTouch extends Sprite {

  constructor() {
    super();

    this._xPos = 0;
    this._yPos = 0;

    this.graphics = new Graphics();
    this.graphics.nativeLines = true;
    this.graphics.beginFill(0xFF0099);
    this.graphics.drawRect(0, 0, 100, 100);
    this.graphics.endFill();
    this.graphics.alpha = 0;
    this.addChild(this.graphics);

    this.buttonMode = true;
    this.interactive = true;
    this.cursor = 'pointer';
    this.on('pointerdown', this.onDragStart);
    this.on('pointerup', this.onDragEnd);
    this.on('pointerupoutside', this.onDragEnd);
    this.on('pointermove', this.onDragMove);

    VelocityTracker.track(this, 'xPos,yPos');

    this.ticker = new ticker.Ticker();
    this.ticker = new ticker.Ticker();
    this.ticker.add(this.onTicker, this);
    this.ticker.start();

    this.onUpdate = new MiniSignal();
  }

  onTicker = () => {
    this.onUpdate.dispatch({ x: this._xPos, y: this._yPos });
  }

  onDragStart = (event) => {
    if (this.tween) {
      this.tween.kill();
    }
    this.data = event.data;
    this.lastPosition = this.data.getLocalPosition(this.parent);
    this.startDragPos = this.data.getLocalPosition(this.parent);
  }

  onDragMove = () => {
    if (this.lastPosition) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.xPos += (newPosition.x - this.lastPosition.x);
      this.yPos += (newPosition.y - this.lastPosition.y);
      this.lastPosition = newPosition;
    }
  }

  wasTapped() {
    if (this.startDragPos && this.lastPosition) {
      return MathUtils.within(this.startDragPos.y, this.lastPosition.y, 10);
    }
    return false;
  }

  onDragEnd = () => {
    this.data = null;
    this.lastPosition = null;

    this.tween = ThrowPropsPlugin.to(
      this,
      {
        throwProps: {
          xPos: {
            velocity: 'auto',
            min: this.xMin,
            max: this.xMax,
          },
          yPos: {
            velocity: 'auto',
            min: this.yMin,
            max: this.yMax,
          },
        },
        ease: Strong.easeOut,
        onComplete: () => {
          this.tween = null;
        },
      },
      2, // Maximum duration of the tween
      0, // Minimum duration of the tween
      0.5, // overshootTolerance
    );
  }

  destroy() {
    this.removeListener('pointerdown', this.onDragStart);
    this.removeListener('pointerup', this.onDragEnd);
    this.removeListener('pointerupoutside', this.onDragEnd);
    this.removeListener('pointermove', this.onDragMove);

    if (this.ticker) {
      this.ticker.stop();
      this.ticker = null;
    }

    if (this.graphics) {
      this.graphics.destroy();
      this.graphics = null;
    }
  }

  setDraggableBounds(draggableBounds) {
    this.draggableBound = draggableBounds;
    this.xMin = 0 - (this.draggableBound.width - this.width);
    this.xMax = this.draggableBound.x;
    this.yMin = 0 - (this.draggableBound.height - this.height);
    this.yMax = this.draggableBound.y;
  }

  get xPos() {
    return this._xPos;
  }

  set xPos(value) {
    // console.log('xPos: ', value);
    this._xPos = value;
  }

  get yPos() {
    return this._yPos;
  }

  set yPos(value) {
    this._yPos = value;
  }

}
