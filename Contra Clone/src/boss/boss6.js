import contra from '../index';
import Platform from '../platform';
import BulletL from '../weapon/bulletL';
import Sound from '../sound';
import Person from '../person';

const spritesInfo = {
  door1: {
    xS: 136, yS: 234, w: 33, h: 122, frames: 1, delay: 10,
  },
  door2: {
    xS: 171, yS: 234, w: 32, h: 158, frames: 1, delay: 10,
  },
  doorOpen: {
    xS: 471, yS: 248, w: 10, h: 76, frames: 10, delay: 100,
  },
  doorOpened: {
    xS: 561, yS: 248, w: 10, h: 76, frames: 1, delay: 10,
  },
  bullet: {
    xS: 44, yS: 306, w: 20, h: 11, frames: 2, delay: 20,
  },
};

const bossInfo = {
  stay0: {
    xS: 346, yS: 238, w: 54, h: 62, frames: 1, delay: 30,
  },
  run0: {
    xS: 346, yS: 238, w: 54, h: 62, frames: 2, delay: 30,
  },
  jump0: {
    xS: 279, yS: 242, w: 64, h: 58, frames: 1, delay: 30,
  },
  attack0: {
    xS: 215, yS: 240, w: 60, h: 60, frames: 1, delay: 30,
  },
  stay1: {
    xS: 346, yS: 302, w: 54, h: 62, frames: 1, delay: 30,
  },
  run1: {
    xS: 346, yS: 302, w: 54, h: 62, frames: 2, delay: 30,
  },
  jump1: {
    xS: 279, yS: 306, w: 64, h: 58, frames: 1, delay: 30,
  },
  attack1: {
    xS: 215, yS: 368, w: 60, h: 60, frames: 1, delay: 30,
  },
  stay2: {
    xS: 346, yS: 368, w: 54, h: 62, frames: 1, delay: 30,
  },
  run2: {
    xS: 346, yS: 368, w: 54, h: 62, frames: 2, delay: 30,
  },
  jump2: {
    xS: 279, yS: 372, w: 64, h: 58, frames: 1, delay: 30,
  },
  attack2: {
    xS: 215, yS: 370, w: 60, h: 60, frames: 1, delay: 30,
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

export default class Boss6 extends Person {
  constructor(x, y, level) {
    const image = contra.res.boss;
    super(x - 34, y + 116, 50, bossInfo, Object.keys(bossInfo), image, level, 'bigBoom');
    this.x = x;
    this.y = y;
    this.level = level;
    this.score = 30000;
    this.moveSpeed = 1.5;
    this.fallSpeed = 2.5;
    this.stage = 0;
    this.isFlip = false;
    this.vectorMove = -1;
    this.start = false;
    this.pose = 0; // 0- run, 1 - wall, return, jump, shoot
    this.vectorJump = 1;

    const boom = Object.values(level.elementsInfo.bigBoom);

    this.boomsArray = [];
    for (let i = 0; i < 3; i += 1) {
      this.boomsArray.push({
        delay: Math.abs(i - 3.5) * 100,
        sprite: createSprite(contra.res.elementS, ...boom, x - 60 + (20 * i), y + (20 * i)),
      });
      this.boomsArray.push({
        delay: Math.abs(i - 3.5) * 100,
        sprite: createSprite(contra.res.elementS, ...boom, x - 60 + 120 - (20 * i), y + (20 * i)),
      });
    }

    const newRect = (xT, yT, w, h) => contra.pjs.game.newRectObject({
      x: xT, y: yT, w, h,
    });

    this.aims = [
      newRect(this.spritesMesh.x - 7, this.spritesMesh.y - 50, 15, 50),
      newRect(this.spritesMesh.x - 1, this.spritesMesh.y - 59, 10, 9),
    ];

    this.door = {
      doorPlatform: new Platform(50, 200, x + 30, 0, 'VERTICAL', false),
      endPlatform: new Platform(50, 200, x + 60, 0, 'VERTICAL', false),
      sprites: {
        door1: createSprite(image, ...Object.values(spritesInfo.door1), x, y),
        door2: createSprite(image, ...Object.values(spritesInfo.door2), x + spritesInfo.door1.w, y),
        doorOpen: createSprite(image, ...Object.values(spritesInfo.doorOpen), x + 26, y + 42),
        doorOpened: createSprite(image, ...Object.values(spritesInfo.doorOpened), x + 26, y + 42),
      },
      colorRect: [
        newRect(x + 5, y, 35, 113),
        newRect(x + spritesInfo.door1.w, y, spritesInfo.door2.w, 143),
      ],
      selectedColor: [0, 130, 254],
      coef: [2, 2, -2],
    };

    this.boomsArray.forEach((boomT) => {
      // eslint-disable-next-line no-param-reassign
      boomT.sprite.visible = false;
    });

    this.shootReloading = 5000;
    this.canShoot = true;
    this.selectState('stay');

    this.bullet = {
      vectorMove: 0,
      sprite: createSprite(image, ...Object.values(spritesInfo.bullet), 0, 0),
      moveSpeed: 3,
      fallSpeed: 2,
      isActive: false,
    };

    level.elementsArray.push(this);
  }

  tryAction(camPos) {
    this.changeColor();
    if (camPos < this.level.length && camPos > this.level.length - 70) {
      this.level.canMoveCamera = false;
      this.level.moveCamera(2);
      if (camPos > this.level.length - 3) {
        this.start = true;
        this.selectState('run');
        Sound.play('siren');
      }
    }

    this.door.colorRect[0].draw();
    this.door.sprites.door1.draw();
    this.spritesMesh.draw();
    this.drawShadow();

    this.aims.forEach((el) => { el.drawStaticBox(); });

    if (this.bullet.isActive) {
      const spr = this.bullet.sprite;
      const dx = this.bullet.vectorMove * this.bullet.moveSpeed;
      const dy = spr.y > 165 - spr.h ? 0 : this.bullet.fallSpeed;
      spr.move(contra.pjs.vector.point(dx, dy));
      spr.draw();
      const { player } = contra;
      if (spr.isStaticIntersect(player.getBox()) && player.assailable) {
        player.die();
      }
      if (!spr.isStaticIntersect(this.level.levelBorder.sprite.getStaticBox())) {
        this.bullet.isActive = false;
      }
    }

    if (this.health > 0 && this.start) {
      this.checkColission(this.aims);
      if (this.health < 1) {
        this.die();
      } else {
        if (contra.player.assailable && this.aims[0].isStaticIntersect(contra.player.getBox())) {
          contra.player.die();
        }
        const spr = this.selectedState.sprite;
        if (this.pose === 0) {
          const isPlatformIntersect = this.door.doorPlatform.sprite
            .isStaticIntersect(spr.getStaticBoxD(0, 0, this.moveSpeed));
          const isLeftBorderIntersect = this.level.leftBorder.sprite
            .isStaticIntersect(spr.getStaticBoxA(-this.moveSpeed));
          if ((this.vectorMove > 0 && isPlatformIntersect)
            || (this.vectorMove < 0 && isLeftBorderIntersect)) {
            // this.pose = 1;
            this.vectorMove *= -1;
            this.flip(this.vectorMove === 1 ? 1 : 0, 0);
          } else {
            const dx = this.vectorMove * this.moveSpeed;
            let dy = this.fallSpeed * this.vectorJump;
            const collisionSArray = contra.selectedLevel.platformActual.filter((platform) => platform.collision === 'BOTTOM'
              && platform.sprite.isStaticIntersect(spr.getStaticBoxS(0, 0, 0, this.fallSpeed)));

            if (collisionSArray.length > 0) {
              dy = collisionSArray[0].sprite.y - (spr.y + spr.h);
            }
            this.spritesMesh.move(contra.pjs.vector.point(dx, dy));
            this.aims.forEach((aim) => {
              aim.move(contra.pjs.vector.point(dx, dy));
            });
          }

          // let dx =
        } else if (this.pose === 1) {

        }
      }

      if (!this.bullet.isActive) {
        // this.shoot();
      }
    } else {
      this.boomsArray.forEach((boom) => {
        boom.sprite.draw();
      });
    }
    this.door.colorRect[1].draw();
    this.door.sprites.door2.draw();
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
    this.selectState('attack');
    setTimeout(() => {
      this.selectState('stay');
    }, 200);
    this.bullet.isActive = true;
    this.bullet.vectorMove = this.vectorMove;
    const spr = this.selectedState.sprite;
    this.bullet.sprite.x = this.isFlip ? spr.x + spr.w : spr.x;
    this.bullet.sprite.y = spr.y + 22;
  }

  isTimeToShow(camPos) {
    if (camPos > this.x - 320) {
      this.level.bosses.push(this);
      this.level.elementsArray.splice(this.level.elementsArray.indexOf(this), 1);
      this.level.platformActual.push(this.door.doorPlatform);
    }
  }

  checkColission(aims) {
    const { health } = this;
    this.level.playerBulletsArray.forEach((bullet) => {
      if (this.health > 0 && bullet.needCheckCpllision) {
        aims.forEach((aim) => {
          if (((bullet instanceof BulletL && aim.isDynamicIntersect(bullet.getBox())) || aim.isStaticIntersect(bullet.getBox()))) {
            Sound.play('damage');
            this.health -= bullet.damage;
            if (this.health < 30 && this.health > 15 && health > 29) {
              this.stage = 1;
              this.selectState(this.selectedState.name.substring(0, this.selectedState.name.length - 1));
            } else if (this.health < 16 && health > 15) {
              this.stage = 2;
              this.selectState(this.selectedState.name.substring(0, this.selectedState.name.length - 1));
            }
            bullet.tryRemove();
          }
        });
      }
    });
  }

  changeColor() {
    for (let i = 0; i < 3; i += 1) {
      if (this.door.selectedColor[i] === 254 && this.door.coef[i] === 2) {
        this.door.coef[i] = -2;
      } else if (this.door.selectedColor[i] === 0 && this.door.coef[i] === -2) {
        this.door.coef[i] = 2;
      }
      this.door.selectedColor[i] += this.door.coef[i];
    }
    this.door.colorRect.forEach((element) => {
      element.fillColor = contra.pjs.colors.rgb(...this.door.selectedColor);
    });
  }

  selectState(stateName, selectByTime) {
    stateName += this.stage;
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
}
