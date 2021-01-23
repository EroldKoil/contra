/* eslint-disable eol-last */
/* eslint-disable import/no-cycle */
import SprObject from '../sprObject';
import contra from '../index';

export default class Bullet extends SprObject {
  constructor(damage, x, y, dx, dy) {
    super(x, y, 0, 0);
    this.damage = damage;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  draw(level, bulletsArray) {
    this.sprite.move(contra.pjs.vector.point(this.dx, this.dy));
    if (!this.sprite.isStaticIntersect(level.levelBorder.sprite.getStaticBox())) {
      bulletsArray.splice(bulletsArray.indexOf(this), 1);
    } else {
      this.sprite.draw();
      //this.sprite.drawDynamicBox();
      // проверка на попадание в противника или игрока. зависит от хозяина пули
    }
  }
}