/* eslint-disable import/no-cycle */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import Bullet from './bullet';
import contra from '../index';

export default class BulletL extends Bullet {
  constructor(x, y, dx, dy, level) {
    super(3, x, y, dx, dy);
    let dDeg;
    let xCor = 0;
    let yCor = 0;
    if (dy === dx) {
      if (dx < 0) {
        xCor = -30;
        yCor = -10;
      } else {
        xCor = -10;
        yCor = 5;
      }
      dDeg = 45;
    } else if (dx === 0) {
      xCor = -18;
      yCor = -5;
      dDeg = 90;
    } else if (dx + dy === 0) {
      if (dx < 0) {
        xCor = -22;
        yCor = 0;
      } else {
        xCor = -10;
        yCor = -5;
      }
      dDeg = 135;
    } else {
      dDeg = 0;
      if (dx < 0) {
        xCor = -30;
      } else {
        xCor = -10;
      }
    }
    this.sprite = this.createSprite(level.elementsInfo.shootL, contra.res.elementS, x + xCor, y + yCor);
    this.sprite.setAngle(dDeg);
    console.log(this.sprite.getDynamicBox());
  }

  getBox() {
    return this.sprite.getDynamicBox();
  }
}