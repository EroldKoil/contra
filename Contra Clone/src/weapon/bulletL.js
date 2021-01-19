import Bullet from './bullet';
import pjs from './../index';

export default class BulletL extends Bullet {
  constructor(x, y, dx, dy, level, type) {
    super(3, x, y, dx, dy);
    this.sprite = this.createSprite(level.elementsInfo['shootL'], level.elementSprites, x, y);
    this.sprite.setAngle(dx === dy ? 45 : dx === 0 ? 90 : dy === 0 ? 0 : 135);
  }


}