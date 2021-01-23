/* eslint-disable import/no-cycle */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import Bullet from './bullet';
import contra from '../index';

export default class BulletM extends Bullet {
  constructor(x, y, dx, dy, level, type) {
    super(1, x, y, dx, dy);
    const { elementS } = contra.res;
    switch (type) {
      case 'M':
        this.sprite = this.createSprite(level.elementsInfo.shootM, elementS, x, y);
        break;
      case 'D':
        this.sprite = this.createSprite(level.elementsInfo.shoot, elementS, x, y);
        break;
      case 'S':
        this.sprite = this.createSprite(level.elementsInfo.shootS, elementS, x, y);
        break;
      default:
        break;
    }
  }
}