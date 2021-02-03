import Bullet from './bullet';
import contra from '../index';
import Sound from '../sound';

export default class BulletM extends Bullet {
  constructor(x, y, dx, dy, level, bulletArray, type) {
    super(x, y, dx, dy, level, bulletArray);
    const { elementS } = contra.res;
    this.sprite = this.createSprite(level.elementsInfo[`shoot${type}`], elementS, x, y);
    if (type !== 'E') {
      Sound.play(`fire${type}`);
    }
  }
}
