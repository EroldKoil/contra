/* eslint-disable */

import contra from '../index';
import Sniper from '../enemy/sniper';
import Platform from '../platform';
import BulletL from '../weapon/bulletL'

const spritesInfo = {
  firstPart: { xS: 193, yS: 10, w: 112, h: 183, frames: 1, delay: 10 },
  secondPart: { xS: 318, yS: 75, w: 31, h: 44, frames: 1, delay: 10 },
  tonnel: { xS: 314, yS: 32, w: 109, h: 37, frames: 1, delay: 10 },
  gunLeft: { xS: 314, yS: 24, w: 12, h: 6, frames: 1, delay: 10 },
  gunLeftShoot: { xS: 328, yS: 24, w: 12, h: 6, frames: 1, delay: 10 },
  gunRight: { xS: 314, yS: 12, w: 24, h: 9, frames: 1, delay: 10 },
  gunRightShoot: { xS: 339, yS: 12, w: 24, h: 9, frames: 1, delay: 10 },
  aim: { xS: 218, yS: 198, w: 26, h: 31, frames: 3, delay: 15 },
};

export default class Boss1 {
  constructor(x, y, level) {
    this.x = x;
    this.y = y;
    this.health = 4; //32
    this.level = level;

    const image = contra.res.boss;
    const elementS = contra.res.elementS;
    const mediumBoom = Object.values(level.elementsInfo['mediumBoom']);

    this.leftGun = this.createGun(x + 4, y + 72, 'gunLeft', image, elementS, mediumBoom);
    this.rightGun = this.createGun(x + 25, y + 71, 'gunRight', image, elementS, mediumBoom);
    this.sniper = new Sniper(this.x + 16, y + 30, 'STAYH', level, this);
    this.aim = createSprite(image, ...Object.values(spritesInfo['aim']), x + 7, y + 103);

    this.leftGun.selectState('sprite');
    this.rightGun.selectState('sprite');

    this.shootReloading = 1200;
    this.rightGun.canShoot = false;

    this.sprites = {
      first: createSprite(image, ...Object.values(spritesInfo['firstPart']), x, y),
      second: createSprite(image, ...Object.values(spritesInfo['secondPart']), x + 13, y - 9),
      tonnel: createSprite(image, ...Object.values(spritesInfo['tonnel']), x + 2, y + 101),
      booms: [createSprite(elementS, ...mediumBoom, x + 3, y + 101)],
    }


    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 2; j += 1) {
        this.sprites.booms.push(createSprite(elementS, ...mediumBoom, x + 3 + i * 26, y + 90 + j * 30))
      }
    }

    this.platforms = [
      new Platform(10, 166, x + 3, y, 'VERTICAL', false),
      new Platform(13, 20, x, 174, 'FORAUTOJUMP', false),
      new Platform(110, 3, x + 8, 180, 'BOTTOM', false),
    ]

    this.bulletsActual = [];
    this.bulletsArray = [];

    for (let i = 0; i < 6; i += 1) {
      this.bulletsArray.push(new BossBullet(this.bulletsArray, this.bulletsActual, level));
    }

    level.elementsArray.push(this);
  }

  createGun(x, y, name, image, elementS, mediumBoom) {
    return {
      health: 16,
      sprite: createSprite(image, ...Object.values(spritesInfo[name]), x, y),
      spriteShoot: createSprite(image, ...Object.values(spritesInfo[`${name}Shoot`]), x, y),
      die: createSprite(elementS, ...mediumBoom, x - 5, y - 10),
      needShow: true,
      canShoot: true,
      selectState(name) {
        ['sprite', 'spriteShoot', 'die'].forEach((state) => {
          if (state === name) {
            this.selectedState = this[state];
            this[state].visible = true;
          } else {
            this[state].visible = false;
          }
        });
      },
    }
  }

  tryAction(camPos) {
    if (camPos < this.level.length && camPos > this.level.length - 70) {
      this.level.canMoveCamera = false;
      this.level.moveCamera(2)
    }

    this.sprites.first.draw();
    if (this.sniper) {
      this.sniper.tryAction();
    }
    this.sprites.second.draw();

    /* this.platforms.forEach((p) => {
       p.sprite.drawStaticBox();
     });*/
    [this.leftGun, this.rightGun].forEach((gun) => {
      if (gun.needShow) {
        gun.selectedState.draw();
        if (gun.health > 0) {
          this.checkColission(gun, gun.selectedState);
        }

        if (gun.health > 0) {
          if (gun.canShoot) {
            this.shoot(gun.spriteShoot);
            gun.canShoot = false;
            gun.selectState('spriteShoot');
            setTimeout(() => {
              gun.selectState('sprite');
            }, 100);
            setTimeout(() => {
              gun.canShoot = true;
            }, this.shootReloading);
          }

        } else {
          gun.selectState('die');
          setTimeout(() => {
            gun.needShow = false;
          }, 400);
        }
      }
    });

    if (this.health > 0) {
      this.checkColission(this, this.aim);
      if (this.health < 1) {
        this.die();
      }
    }

    if (this.aim) {
      if (this.health < 1) {
        console.log('aim true . health no')
        contra.player.calculateMoves([false, false, false, false, false, false]);
        this.sprites.tonnel.draw();
        this.sprites.booms.forEach((boom) => {
          boom.draw();
        });
      } else {
        this.aim.draw();
      }
    } else {
      this.sprites.tonnel.draw();
      const needJump = this.platforms[1].sprite.isStaticIntersect(contra.player.selectedState.sprite.getStaticBoxD(4, 0, -7));
      contra.player.calculateMoves([false, true, false, false, needJump, false]);
      if (needJump) {
        setTimeout(() => {
          /*   contra.player.spritesMesh.x = camPos.x + 10;
             contra.player.spritesMesh.y = camPos.y + 10;*/
        }, 2000);
      }
    }

    this.bulletsActual.forEach((bullet) => {
      bullet.draw();
    });
  }

  die() {
    [this.leftGun, this.rightGun].forEach((gun) => {
      gun.health = 0;
    });
    if (this.sniper) {
      this.sniper.die();
    }
    this.bulletsActual = [];

    this.level.isComplite = true;


    setTimeout(() => {
      this.level.isComplite = true;
      this.aim = null;
      this.platforms[0].sprite.y = 163;
      this.sprites.booms = [];
    }, 1300);
  }

  shoot(gun) {
    const n = this.bulletsArray.length - 1;
    const bullet = this.bulletsArray[n];
    this.bulletsArray.splice(n, 1);
    this.bulletsActual.push(bullet);
    bullet.shoot(gun.x, gun.y);
  }

  isTimeToShow(camPos) {
    if (camPos > this.x - 300) {
      setTimeout(() => {
        this.rightGun.canShoot = true;
      }, this.shootReloading / 2);

      this.platforms.forEach((p) => {
        p.addToActual(this.level);
      });
      this.level.bosses.push(this);
      this.level.elementsArray.splice(this.level.elementsArray.indexOf(this), 1);
    }
  }

  checkColission(aim, sprite) {
    this.level.playerBulletsArray.forEach(bullet => {
      if (this.health > 0 && bullet.needCheckCpllision &&
        ((bullet instanceof BulletL && sprite.isDynamicIntersect(bullet.getBox())) || sprite.isStaticIntersect(bullet.getBox()))) {
        aim.health -= bullet.damage;
        bullet.tryRemove();
      }
    });
  }
}

class BossBullet {
  constructor(arrFrom, arrTo, level) {
    this.arrFrom = arrFrom;
    this.arrTo = arrTo;

    this.spritesArr = [
      createSprite(contra.res.elementS, ...Object.values(level.elementsInfo['shootM1'])),
      createSprite(contra.res.elementS, ...Object.values(level.elementsInfo['mediumBoom']), -3, -10),
    ]
    this.spritesArr[0].visible = false;
    this.spritesArr[1].visible = false;
    this.selectedState = -1;

    this.spritesMesh = contra.pjs.game.newMesh({
      x: 0,
      y: 0,
      add: this.spritesArr,
    });

    this.vector = [-2, -2];
    this.timeForFly = 0;
  }

  shoot(x, y) {
    this.spritesMesh.setPosition(contra.pjs.vector.point(x - 8, y))
    this.timeForFly = Math.random() * 200;
    this.spritesArr[0].visible = true;
    this.spritesArr[1].visible = false;
    this.selectedState = 0;
    //this.time = 0;
    this.vector = [-1, -2];
    this.vector[0] = Math.random() * -1.5 - 0.5;

    setTimeout(() => {
      this.vector[1] = -1;
      setTimeout(() => {
        this.vector[1] = 1;
        setTimeout(() => {
          this.vector[1] = 2;
        }, 100);
      }, 100);
    }, this.timeForFly);
  }

  draw() {
    const spr = this.spritesArr[this.selectedState];
    spr.draw();
    if (this.selectedState === 0) {
      /* this.time += 1;
       if (this.time > this.timeForFly) {
         this.vector[1] = 2;
       }*/

      if (spr.isStaticIntersect(contra.player.selectedState.sprite.getStaticBox())) {
        this.die();
        contra.player.die();
      } else if (spr.y + spr.h > 196) {
        this.die();
      } else {
        this.spritesMesh.move(contra.pjs.vector.point(...this.vector));
      }
    }
  }

  die() {
    this.spritesArr[1].visible = true;
    this.spritesArr[0].visible = false;
    this.selectedState = 1;
    setTimeout(() => {
      setTimeout(() => {
        this.arrTo.splice(this.arrTo.indexOf(this), 1);
        this.arrFrom.push(this);
      }, 500);
    }, 300);
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