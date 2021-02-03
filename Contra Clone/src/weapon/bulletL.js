import Bullet from './bullet';
import contra from '../index';
import Sound from '../sound';

export default class BulletL extends Bullet {
  constructor(x, y, dx, dy, level, bulletArray) {
    super(x, y, dx, dy, level, bulletArray);
    let dDeg;
    let xCor = 0;
    let yCor = 0;
    if (dy === dx) {
      if (dx < 0) {
        xCor = -14;
        yCor = -5;
      } else {
        xCor = 4;
        yCor = 3;
      }
      dDeg = 45;
    } else if (dx === 0) {
      xCor = -4;
      yCor = -5;
      dDeg = 90;
    } else if (dx + dy === 0) {
      if (dx < 0) {
        xCor = -10;
        yCor = -2;
      } else {
        xCor = 5;
        yCor = -5;
      }
      dDeg = 135;
    } else {
      dDeg = 0;
      xCor = -10;
    }
    this.sprite = this.createSprite(level.elementsInfo.shootL,
      contra.res.elementS, x + xCor, y + yCor);
    this.sprite.setAngle(dDeg);
    Sound.play('fireL');
  }

  getBox() {
    return this.sprite.getDynamicBox();
  }

  tryRemove() {
    this.needCheckCpllision = false;
    this.bulletArray.splice(this.bulletArray.indexOf(this), 1);
  }
}
