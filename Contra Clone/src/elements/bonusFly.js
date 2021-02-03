import contra from '../index';
import SprObject from '../sprObject';
import Bonus from './bonus';
import BulletL from '../weapon/bulletL';
import Sound from '../sound';

export default class BonusFly extends SprObject {
  constructor(x, y, type, level) {
    super(x, y, 0, 0);
    this.score = 500;
    this.type = type;
    this.level = level;
    this.vectorX = 2;
    this.vectorY = 2;
    this.health = 1;
    this.sprite = this.createSprite(contra.res.elementS,
      ...Object.values(level.elementsInfo.flyBonus), 100, x, y);
    level.elementsArray.push(this);
  }

  isTimeToShow(camPos) {
    if (camPos > this.x) {
      this.level.enemyArray.push(this);
      this.level.elementsArray.splice(this.level.elementsArray.indexOf(this), 1);
    }
  }

  createSprite(image, xS, yS, w, h, frames = 1, delay = 100, x, y) {
    return contra.pjs.game.newAnimationObject({
      animation: image.getAnimation(xS, yS, w, h, frames),
      x,
      y,
      w,
      h,
      delay,
    });
  }

  checkColission(aim) {
    this.level.playerBulletsArray.forEach((bullet) => {
      if (this.health > 0 && ((bullet instanceof BulletL && aim.isDynamicIntersect(bullet.getBox()))
          || aim.isStaticIntersect(bullet.getBox()))) {
        this.health -= bullet.damage;
        bullet.tryRemove();
        if (this.health < 1) {
          this.die();
        }
      }
    });
  }

  tryRemove(die, camPos) {
    if (die || camPos < this.sprite.x - 300) {
      this.level.enemyArray.splice(this.level.enemyArray.indexOf(this), 1);
    }
  }

  tryAction() {
    this.sprite.draw();
    const camPos = contra.pjs.camera.getPosition().x;
    this.tryRemove(false, camPos);

    if (this.health > 0) {
      const spr = this.sprite;

      if ((spr.y > this.y && this.vectorY > 0) || (spr.y < this.y - 50 && this.vectorY < 0)) {
        this.vectorY *= -1;
      }
      let dy = this.vectorY;
      if (spr.y < this.y - 45 || spr.y > this.y - 5) {
        dy *= 0.5;
      }
      spr.move(contra.pjs.vector.point(this.vectorX, dy));
      this.checkColission(spr);
    }
  }

  die() {
    const spr = this.sprite;
    Sound.play('enemyDeath');
    contra.addScore(this.score);
    this.sprite = this.createSprite(contra.res.elementS,
      ...Object.values(this.level.elementsInfo.mediumBoom), spr.x, spr.y);
    this.level.bonuses.push(new Bonus(spr.x, spr.y, this.type, this.level));
    setTimeout(() => {
      contra.score += 100;
      this.tryRemove(true);
    }, 500);
  }
}
