import Bullet from './bullet';
import pjs from './../index';

export default class BulletM extends Bullet {
  constructor(x, y, dx, dy, level, isM) {
    super(1, x, y, dx, dy);
    if (isM) {
      this.sprite = this.createSprite(level.elementsInfo['shootM'], level.elementSprites, x, y);
    } else {
      this.sprite = this.createSprite(level.elementsInfo['shoot'], level.elementSprites, x, y);
    }
  }
}