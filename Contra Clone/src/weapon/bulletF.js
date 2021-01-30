/* eslint-disable*/

import Bullet from './bullet';
import contra from '../index';
import Sound from '../sound';

export default class BulletF extends Bullet {
  constructor(x, y, dx, dy, level, bulletArray) {
    super(x, y, dx, dy, level, bulletArray);
    this.deg = 0;
    this.sprite = this.createSprite(level.elementsInfo.shootF, contra.res.elementS, x, y);
    this.d = 12;
    Sound.play('fireF');
  }

  draw() {
    if (this.needCheckCpllision) {
      this.deg = (this.deg + Math.PI / 8) % (2 * Math.PI);
      const p = contra.pjs.vector.point;
      this.x += this.dx;
      this.y += this.dy;

      if (this.sprite.isStaticIntersect(this.level.levelBorder.sprite.getStaticBox())) {
        const xy = this.getDxy(this.deg + (Math.PI / 3), this.d);
        this.sprite.setPosition(p(this.x + xy[0], this.y + xy[1]));

      } else {
        this.tryRemove();
      }
    }
    this.sprite.draw();
  }

  getDxy(alfa, d) {
    return [d * Math.cos(alfa), -d * Math.sin(alfa)];
  }
}