import contra from '../index';
import Sniper from '../enemy/sniper';
import Platform from '../platform';
import BulletL from '../weapon/bulletL';
import Sound from '../sound';
import startScreen from '../startscreen';
import BossBullet from './bossBullet';

const spritesInfo = {
  firstPart: {
    xS: 193, yS: 10, w: 112, h: 183, frames: 1, delay: 10,
  },
  secondPart: {
    xS: 318, yS: 75, w: 31, h: 44, frames: 1, delay: 10,
  },
  tonnel: {
    xS: 314, yS: 32, w: 109, h: 37, frames: 1, delay: 10,
  },
  gunLeft: {
    xS: 314, yS: 24, w: 12, h: 6, frames: 1, delay: 10,
  },
  gunLeftShoot: {
    xS: 328, yS: 24, w: 12, h: 6, frames: 1, delay: 10,
  },
  gunRight: {
    xS: 314, yS: 12, w: 24, h: 9, frames: 1, delay: 10,
  },
  gunRightShoot: {
    xS: 339, yS: 12, w: 24, h: 9, frames: 1, delay: 10,
  },
  aim: {
    xS: 218, yS: 198, w: 26, h: 31, frames: 3, delay: 15,
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

export default class Boss1 {
  constructor(x, y, level) {
    this.x = x;
    this.y = y;
    this.health = 32;
    this.level = level;
    this.score = 10000;
    this.gunScore = 1000;
    const image = contra.res.boss;
    const { elementS } = contra.res;
    const mediumBoom = Object.values(level.elementsInfo.mediumBoom);

    this.leftGun = this.createGun(x + 4, y + 72, 'gunLeft', image, elementS, mediumBoom);
    this.rightGun = this.createGun(x + 25, y + 71, 'gunRight', image, elementS, mediumBoom);
    this.sniper = new Sniper(this.x + 16, y + 30, 'STAYH', level, this);
    this.aim = createSprite(image, ...Object.values(spritesInfo.aim), x + 7, y + 103);

    this.leftGun.selectState('sprite');
    this.rightGun.selectState('sprite');

    this.shootReloading = 1200;

    this.sprites = {
      first: createSprite(image, ...Object.values(spritesInfo.firstPart), x, y),
      second: createSprite(image, ...Object.values(spritesInfo.secondPart), x + 13, y - 9),
      tonnel: createSprite(image, ...Object.values(spritesInfo.tonnel), x + 2, y + 101),
      booms: [createSprite(elementS, ...mediumBoom, x + 3, y + 101)],
    };

    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 2; j += 1) {
        this.sprites.booms.push(
          createSprite(elementS, ...mediumBoom, x + 3 + i * 26, y + 90 + j * 30),
        );
      }
    }

    this.platforms = [
      new Platform(10, 166, x + 3, y, 'VERTICAL', false),
      new Platform(13, 20, x, 174, 'FORAUTOJUMP', false),
      new Platform(110, 3, x + 8, 180, 'BOTTOM', false),
    ];

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
      canShoot: false,
      selectState(stateName) {
        ['sprite', 'spriteShoot', 'die'].forEach((state) => {
          if (state === stateName) {
            this.selectedState = this[state];
            this[state].visible = true;
          } else {
            this[state].visible = false;
          }
        });
      },
    };
  }

  tryAction(camPos) {
    if (camPos < this.level.length && camPos > this.level.length - 70) {
      this.level.canMoveCamera = false;
      this.level.moveCamera(2);
      if (camPos > this.level.length - 3) {
        Sound.play('siren');
        this.leftGun.canShoot = true;
        setTimeout(() => {
          this.rightGun.canShoot = true;
        }, this.shootReloading / 2);
      }
    }

    this.sprites.first.draw();
    if (this.sniper) {
      this.sniper.tryAction();
    }
    this.sprites.second.draw();

    /* this.platforms.forEach((p) => {
       p.sprite.drawStaticBox();
     }); */
    [this.leftGun, this.rightGun].forEach((gun) => {
      if (gun.needShow) {
        gun.selectedState.draw();
        if (gun.health > 0) {
          this.checkColission(gun, gun.selectedState);
          if (gun.health > 0) {
            if (gun.canShoot) {
              this.shoot(gun.spriteShoot);
              // eslint-disable-next-line no-param-reassign
              gun.canShoot = false;
              gun.selectState('spriteShoot');
              setTimeout(() => {
                gun.selectState('sprite');
              }, 100);
              setTimeout(() => {
                // eslint-disable-next-line no-param-reassign
                gun.canShoot = true;
              }, this.shootReloading);
            }
          } else {
            contra.addScore(this.gunScore);
            this.gunDie(gun);
          }
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
      const needJump = this.platforms[1].sprite.isStaticIntersect(
        contra.player.selectedState.sprite.getStaticBoxD(4, 0, -7),
      );
      contra.player.calculateMoves([false, true, false, false, needJump, false]);
      if (needJump) {
        // gameComplite();
        setTimeout(startScreen, 2000, contra, 2, contra.startGame);
      }
    }

    this.bulletsActual.forEach((bullet) => {
      bullet.draw();
    });
  }

  gunDie(gun) {
    gun.selectState('die');
    Sound.play('enemyDeath');
    setTimeout(() => {
      // eslint-disable-next-line no-param-reassign
      gun.needShow = false;
    }, 400);
  }

  die() {
    [this.leftGun, this.rightGun].forEach((gun) => {
      // eslint-disable-next-line no-param-reassign
      gun.health = 0;
      this.gunDie(gun);
    });
    if (this.sniper) {
      this.sniper.die();
    }
    this.level.enemyArray.forEach((enemy) => {
      enemy.die();
    });
    this.bulletsActual = [];
    contra.addScore(this.score);
    this.level.isComplite = true;
    Sound.play('boss1death');
    this.level.onKeyboard();
    setTimeout(() => {
      Sound.stopMusic();
      Sound.play('afterBossDeath');

      this.sprites.booms = [];
      setTimeout(() => {
        this.aim = null;
        this.platforms[0].sprite.y = 163;
      }, 1000);
    }, 2500);
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
      this.platforms.forEach((p) => {
        p.addToActual(this.level);
      });
      this.level.bosses.push(this);
      this.level.elementsArray.splice(this.level.elementsArray.indexOf(this), 1);
    }
  }

  checkColission(aim, sprite) {
    this.level.playerBulletsArray.forEach((bullet) => {
      if (this.health > 0 && bullet.needCheckCpllision
        && ((bullet instanceof BulletL && sprite.isDynamicIntersect(bullet.getBox()))
          || sprite.isStaticIntersect(bullet.getBox()))) {
        // eslint-disable-next-line no-param-reassign
        aim.health -= bullet.damage;
        Sound.play('damage');
        bullet.tryRemove();
      }
    });
  }
}
