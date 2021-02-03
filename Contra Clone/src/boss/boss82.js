import contra from '../index';
import Platform from '../platform';
import BulletL from '../weapon/bulletL';
import Sound from '../sound';
import gameComplite from '../gameComplite';

const spritesInfo = {
  body: {
    xS: 1, yS: 560, w: 90, h: 144, frames: 8, delay: 10,
  },
  blackHeard: {
    xS: 303, yS: 454, w: 54, h: 59, frames: 1, delay: 10,
  },
};

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

export default class Boss82 {
  constructor(x, y, level) {
    this.x = x;
    this.y = y;
    this.health = 5;
    this.level = level;
    this.score = 500000;
    const image = contra.res.boss;
    const boom = Object.values(level.elementsInfo.bigBoom);

    this.boomsArray = [];
    for (let i = 0; i < 7; i += 1) {
      this.boomsArray.push({
        delay: Math.abs(i - 3.5) * 100,
        sprite: createSprite(contra.res.elementS, ...boom, x - 60 + (20 * i), y + (20 * i)),
      });
      this.boomsArray.push({
        delay: Math.abs(i - 3.5) * 100,
        sprite: createSprite(contra.res.elementS, ...boom, x - 60 + 120 - (20 * i), y + (20 * i)),
      });
    }

    this.body = createSprite(image, ...Object.values(spritesInfo.body), x, y);
    this.blackHeard = createSprite(image, ...Object.values(spritesInfo.blackHeard), x + 32, y + 32);

    // eslint-disable-next-line no-param-reassign
    this.boomsArray.forEach((boomT) => { boomT.sprite.visible = false; });

    this.wallPlatform = new Platform(10, 144, x + 21, y, 'VERTICAL', false);
    this.aim = contra.pjs.game.newRectObject({
      x: x + 34, y: y + 39, w: 55, h: 50,
    });

    level.elementsArray.push(this);
  }

  tryAction(camPos) {
    if (camPos < this.level.length && camPos > this.level.length - 50) {
      this.level.canMoveCamera = false;
      this.level.moveCamera(2);
    }

    this.body.draw();
    if (this.health > 0) {
      this.checkColission(this.aim);
      if (this.health < 1) {
        this.die();
      }
    } else {
      contra.player.calculateMoves([false, false, false, false, false, false]);
      this.blackHeard.draw();
      this.boomsArray.forEach((boom) => {
        boom.sprite.draw();
      });
    }
  }

  die() {
    contra.addScore(this.score);
    this.level.enemyArray.forEach((enemy) => {
      if (enemy !== this) {
        enemy.die();
      }
    });

    this.boomsArray.forEach((boom) => {
      setTimeout(() => {
        // eslint-disable-next-line no-param-reassign
        boom.sprite.visible = true;
        setTimeout(() => {
          // eslint-disable-next-line no-param-reassign
          boom.sprite.visible = false;
        }, 400);
      }, boom.delay);
    });
    Sound.play('boss3death');
    this.level.onKeyboard();
    setTimeout(() => {
      Sound.stopMusic();
      Sound.play('afterBossDeath');

      setTimeout(() => {
        setTimeout(gameComplite, 2000);
        // setTimeout(startScreen, 2000, contra, 1, contra.startGame);
      }, 2000);
    }, 2500);
  }

  isTimeToShow(camPos) {
    if (camPos > this.x - 300) {
      this.level.enemyArray.push(this);
      this.level.elementsArray.splice(this.level.elementsArray.indexOf(this), 1);
      this.level.platformActual.push(this.wallPlatform);
    }
  }

  checkColission(aim) {
    this.level.playerBulletsArray.forEach((bullet) => {
      if (this.health > 0 && bullet.needCheckCpllision) {
        if (((bullet instanceof BulletL && aim.isDynamicIntersect(bullet.getBox()))
          || aim.isStaticIntersect(bullet.getBox()))) {
          Sound.play('damage');
          this.health -= bullet.damage;
          bullet.tryRemove();
        }
      }
    });
  }
}
