/* eslint-disable */
import SprObject from '../sprObject';
import contra from '../index';

export default class Bullet extends SprObject {
  constructor(x, y, dx, dy, level, bulletArray) {
    super(x, y, 0, 0);
    this.damage = 1;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.level = level;
    this.bulletArray = bulletArray;
    this.needCheckCpllision = true;
  }

  draw() {
    if (this.needCheckCpllision) {
      this.sprite.move(contra.pjs.vector.point(this.dx, this.dy));
      if (!this.sprite.isStaticIntersect(this.level.levelBorder.sprite.getStaticBox())) {
        contra.results.miss += 1;
        this.tryRemove();
      }
    }
    this.sprite.draw();
  }

  getBox() {
    return this.sprite;
  }

  tryRemove() {
    this.needCheckCpllision = false;
    this.sprite = this.createSprite(this.level.elementsInfo.shootEnd, contra.res.elementS, this.sprite.x, this.sprite.y);
    contra.results.bulletsCount += 1;
    setTimeout(() => {
      this.bulletArray.splice(this.bulletArray.indexOf(this), 1);
    }, 200);
  }
}