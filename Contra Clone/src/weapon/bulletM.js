import Bullet from './bullet';
import pjs from './../index';

export default class BulletM extends Bullet {
  constructor(x, y, dx, dy, level, type) {
    super(1, x, y, dx, dy);
    switch (type) {
      case 'M':
        this.sprite = this.createSprite(level.elementsInfo['shootM'], level.elementSprites, x, y);
        break;
      case 'D':
        this.sprite = this.createSprite(level.elementsInfo['shoot'], level.elementSprites, x, y);
        break;
      case 'S':
        this.sprite = this.createSprite(level.elementsInfo['shootS'], level.elementSprites, x, y);
        break;
      default:
        break;
    }
  }
}