/* eslint-disable */
import BulletL from '../weapon/bulletL'
import contra from '../index';
import Bonus from './bonus';
import Sound from '../sound';

const keys = [
  'bonusR',
  'bonusRClose',
  'bonusROpen',
];

export default class BonusRock {
  constructor(xCenter, yBottom, type, level) {
    this.type = type;
    this.level = level;
    this.xCenter = xCenter;
    this.yBottom = yBottom;
    this.health = 1;
    this.states = {};

    const spritesArr = [];
    keys.forEach((key) => {
      const sp = this.createSprite(contra.res.enemyS, ...Object.values(level.enemiesInfo[key]));
      this.states[key] = { name: key, sprite: sp };
      spritesArr.push(sp);
    });

    const sp = this.createSprite(contra.res.elementS, ...Object.values(level.elementsInfo['mediumBoom']));
    this.states['death'] = { name: 'death', sprite: sp };
    spritesArr.push(sp);

    this.spritesMesh = contra.pjs.game.newMesh({
      x: xCenter,
      y: yBottom,
      add: spritesArr,
    });

    this.selectState('bonusRClose');
    this.isHidden = true;
    this.aim = contra.pjs.game.newRectObject({
      x: xCenter - 12,
      y: yBottom - 27,
      w: 22,
      h: 22,
    });
    level.elementsArray.push(this);
  }

  createSprite(image, xS, yS, w, h, frames = 1, delay = 100, xCoef = 0, yCoef = 0) {
    return contra.pjs.game.newAnimationObject({
      animation: image.getAnimation(xS, yS, w, h, frames),
      x: -(w / 2) + xCoef,
      y: -h + yCoef,
      w,
      h,
      delay,
    });
  }

  isTimeToShow(camPos) {
    if (camPos > this.xCenter - 300) {
      this.level.enemyArray.push(this);
      this.level.elementsArray.splice(this.level.elementsArray.indexOf(this), 1);
    }
  }

  selectState(stateName, selectByTime) {
    if (!selectByTime || this.health > 0) {
      for (const key in this.states) {
        if (key === stateName) {
          this.states[key].sprite.visible = true;
          this.selectedState = this.states[key];
        } else {
          this.states[key].sprite.visible = false;
        }
      }
    }
  }

  checkColission(aim) {
    this.level.playerBulletsArray.forEach(bullet => {
      if (this.health > 0 && ((bullet instanceof BulletL && aim.isDynamicIntersect(bullet.getBox())) ||
          aim.isStaticIntersect(bullet.getBox()))) {
        this.health -= bullet.damage;
        bullet.tryRemove();
        if (this.health < 1) {
          this.die();
        }
      }
    });
  }

  tryRemove(die, camPos) {
    if (die || camPos > this.xCenter + 20) {
      this.level.enemyArray.splice(this.level.enemyArray.indexOf(this), 1);
    }
  }

  tryAction() {
    this.spritesMesh.draw();
    const camPos = contra.pjs.camera.getPosition().x;

    this.tryRemove(false, camPos);

    if (!this.started) {
      this.started = true;
      this.open();
    }

    if (this.health > 0 && !this.isHidden) {
      this.checkColission(this.aim);
    }
  }

  open() {
    setTimeout(() => {
      this.selectState('bonusROpen', true);
      setTimeout(() => {
        this.selectState('bonusR', true);
        this.isHidden = false;
        setTimeout(() => {
          this.hide();
        }, 1500);
      }, 200);
    }, 200);
  }

  hide() {
    setTimeout(() => {
      this.selectState('bonusROpen', true);
      this.isHidden = true;
      setTimeout(() => {
        this.selectState('bonusRClose', true);
        setTimeout(() => {
          this.open();
        }, 1500);
      }, 200);
    }, 200);
  }

  die() {
    this.selectState('death');
    Sound.play('enemyDeath');
    this.level.bonuses.push(new Bonus(this.xCenter - 12, this.yBottom - 31, this.type, this.level));
    setTimeout(() => {
      contra.score += 100;
      this.tryRemove(true);
    }, 500);
  }
}