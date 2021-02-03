import contra from '../index';
import GoldenAlien from '../enemy/goldenAlien';
import Platform from '../platform';
import BulletL from '../weapon/bulletL';
import Sound from '../sound';

const spritesInfo = {
  jawOpen: {
    xS: 60,
    yS: 444,
    w: 114,
    h: 112,
    frames: 1,
    delay: 10,
  },
  jawClose: {
    xS: 174,
    yS: 444,
    w: 112,
    h: 93,
    frames: 1,
    delay: 10,
  },
  wall: {
    xS: 1,
    yS: 451,
    w: 48,
    h: 80,
    frames: 1,
    delay: 10,
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

export default class Boss81 {
  constructor(x, y, level) {
    this.x = x;
    this.y = y;
    this.health = 40;
    this.level = level;
    this.isOpen = false;
    this.updateCount = 30;
    this.score = 5000;
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
    for (let i = 0; i < 2; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        this.boomsArray.push({
          delay: i * 100,
          sprite: createSprite(contra.res.elementS, ...boom, x - 30 + (28 * i), y + 113 + (28 * j)),
        });
      }
    }
    this.boomsArray.forEach((boomT) => {
      // eslint-disable-next-line no-param-reassign
      boomT.sprite.visible = false;
    });

    this.wall = createSprite(image, ...Object.values(spritesInfo.wall), x - 24, y + 112);
    this.wallPlatform = new Platform(10, 80, x - 24, y + 112, 'VERTICAL', false);

    this.shootReloading = 5000;
    this.timeOpenJaw = 40;

    this.canShoot = true;

    const newRect = (xT, yT, w, h) => contra.pjs.game.newRectObject({
      x: xT,
      y: yT,
      w,
      h,
    });

    this.sprites = {
      open: createSprite(image, ...Object.values(spritesInfo.jawOpen), x, y),
      close: createSprite(image, ...Object.values(spritesInfo.jawClose), x, y),
    };
    this.sprites.close.visible = false;

    this.aims = [
      newRect(x + 2, y + 27, 18, 35),
      newRect(x + 4, y + 62, 36, 19),
    ];

    this.aimsJaw = [
      newRect(x + 27, y + 81, 31, 29),
      newRect(x + 15, y + 81, 43, 14),
    ];
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
    this.level.enemyArray.forEach((enemy) => {
      if (enemy instanceof GoldenAlien) {
        enemy.die();
      }
    });
    Sound.play('boss2death');
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
    this.level.playerBulletsArray.forEach((bullet) => {
      if (this.health > 0 && bullet.needCheckCpllision) {
        aims.forEach((aim) => {
          if (((bullet instanceof BulletL && aim.isDynamicIntersect(bullet.getBox())) ||
              aim.isStaticIntersect(bullet.getBox()))) {
            Sound.play('damage');
            this.health -= bullet.damage;
            bullet.tryRemove();
          }
        });
      }
    });
  }
}