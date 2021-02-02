/* eslint-disable */

import contra from '../index';
import Platform from '../platform';
import BulletL from '../weapon/bulletL';
import Sound from '../sound';
import Person from '../person';

// spritesInfo

const spritesInfo = {
  door1: { xS: 136, yS: 234, w: 33, h: 122, frames: 1, delay: 10 },
  door2: { xS: 171, yS: 234, w: 32, h: 158, frames: 1, delay: 10 },
  doorOpen: { xS: 471, yS: 248, w: 10, h: 76, frames: 10, delay: 100 },
  doorOpened: { xS: 561, yS: 248, w: 10, h: 76, frames: 1, delay: 10 },
  bullet: { xS: 44, yS: 306, w: 20, h: 11, frames: 2, delay: 20 }
};

const bossInfo = {
  run0: { xS: 346, yS: 238, w: 54, h: 62, frames: 2, delay: 30 },
  jump0: { xS: 279, yS: 242, w: 64, h: 58, frames: 1, delay: 30 },
  attack0: { xS: 215, yS: 240, w: 60, h: 60, frames: 1, delay: 30 },
  run1: { xS: 346, yS: 302, w: 54, h: 62, frames: 2, delay: 30 },
  jump1: { xS: 279, yS: 306, w: 64, h: 58, frames: 1, delay: 30 },
  attack1: { xS: 215, yS: 368, w: 60, h: 60, frames: 1, delay: 30 },
  run2: { xS: 346, yS: 238, w: 54, h: 62, frames: 2, delay: 30 },
  jump2: { xS: 279, yS: 372, w: 64, h: 58, frames: 1, delay: 30 },
  attack2: { xS: 215, yS: 370, w: 60, h: 60, frames: 1, delay: 30 },
}


export default class Boss6 extends Person {
  constructor(x, y, level) {
    const image = contra.res.boss;
    super(x, y, 50, sprites, bossInfo, image, level, 'bigBoom') {
      this.x = x;
      this.y = y;
      this.level = level;
      this.score = 30000;

      const boom = Object.values(level.elementsInfo['bigBoom']);

      this.boomsArray = [];
      for (let i = 0; i < 3; i += 1) {
        this.boomsArray.push({ delay: Math.abs(i - 3.5) * 100, sprite: createSprite(contra.res.elementS, ...boom, x - 60 + (20 * i), y + (20 * i)) });
        this.boomsArray.push({ delay: Math.abs(i - 3.5) * 100, sprite: createSprite(contra.res.elementS, ...boom, x - 60 + 120 - (20 * i), y + (20 * i)) });
      }

      this.boomsArray.forEach((boom) => {
        boom.sprite.visible = false;
      });

      this.wall = createSprite(image, ...Object.values(spritesInfo['wall']), x - 24, y + 112);
      this.wallPlatform = new Platform(10, 80, x - 24, y + 112, 'VERTICAL', false);

      this.shootReloading = 5000;
      this.timeOpenJaw = 40;

      this.canShoot = true;

      const newRect = (x, y, w, h) => {
        return contra.pjs.game.newRectObject({ x, y, w, h });
      }

      this.sprites = {
        open: createSprite(image, ...Object.values(spritesInfo['jawOpen']), x, y),
        close: createSprite(image, ...Object.values(spritesInfo['jawClose']), x, y),
      }
      this.sprites.close.visible = false;

      this.aims = [
        newRect(x + 2, y + 27, 18, 35),
        newRect(x + 4, y + 62, 36, 19),
      ];

      this.aimsJaw = [
        newRect(x + 27, y + 81, 31, 29),
        newRect(x + 15, y + 81, 43, 14),
      ]
      level.elementsArray.push(this);
    }

    tryAction() {
      if (this.health > 0) {
        this.update();
        this.checkColission([...this.aims, this.aimsJaw[this.isOpen ? 0 : 1]]);
        if (this.health < 1) {
          this.die();
        }
        if (this.canShoot) {
          this.shoot();
        }
      } else {
        this.boomsArray.forEach((boom) => {
          boom.sprite.draw();
        });
      }
    }

    update() {
      this.updateCount -= 1;
      if (this.updateCount < 1) {
        this.isOpen = !this.isOpen;
        this.sprites.open.visible = this.isOpen;
        this.sprites.close.visible = !this.isOpen;
        this.updateCount = this.isOpen ? this.timeOpenJaw : this.timeOpenJaw * 0.75;
      }
      if (this.isOpen) {
        this.sprites.open.draw();
      } else {
        this.sprites.close.draw();
      }
      this.wall.draw();
    }

    die() {
      contra.addScore(this.score);
      this.level.enemyArray.forEach(enemy => {
        if (enemy instanceof GoldenAlien) {
          enemy.die();
        }
      });
      Sound.play('boss2death');
      this.boomsArray.forEach((boom) => {
        setTimeout(() => {
          boom.sprite.visible = true;
          setTimeout(() => {
            boom.sprite.visible = false;
          }, 400);
        }, boom.delay);
      });
      this.level.platformActual.splice(this.level.platformActual.indexOf(this.wallPlatform), 1);
      setTimeout(() => {
        this.level.enemyArray.splice(this.level.enemyArray.indexOf(this), 1);
      }, 1000);
    }

    shoot() {
      for (let i = 0; i < 3; i += 1) {
        setTimeout(() => {
          new GoldenAlien(this.x + 21, this.y + 95, this.level, i);
        }, i * 800);
      }
      this.canShoot = false;
      setTimeout(() => {
        this.canShoot = true;
      }, this.shootReloading);
      this.isOpen = true;
      this.sprites.open.visible = true;
      this.sprites.close.visible = false;
      this.updateCount = this.timeOpenJaw * 1.5;
    }

    isTimeToShow(camPos) {
      if (camPos > this.x - 300) {
        this.level.enemyArray.push(this);
        this.level.elementsArray.splice(this.level.elementsArray.indexOf(this), 1);
        this.level.platformActual.push(this.wallPlatform);
        this.shoot();
      }
    }

    checkColission(aims) {
      this.level.playerBulletsArray.forEach(bullet => {
        if (this.health > 0 && bullet.needCheckCpllision) {
          aims.forEach(aim => {
            if (((bullet instanceof BulletL && aim.isDynamicIntersect(bullet.getBox())) || aim.isStaticIntersect(bullet.getBox()))) {
              Sound.play('damage');
              this.health -= bullet.damage;
              bullet.tryRemove();
            }
          });
        }
      });
    }
  }

  function createSprite(image, xS, yS, w, h, frames = 1, delay = 100, xCoef = 0, yCoef = 0) {
    return contra.pjs.game.newAnimationObject({
      animation: image.getAnimation(xS, yS, w, h, frames),
      x: xCoef,
      y: yCoef,
      w,
      h,
      delay,
    });
  }