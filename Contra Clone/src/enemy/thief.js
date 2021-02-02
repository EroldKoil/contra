/* eslint-disable */

import Weapon from '../weapon/weapon';
import Person from '../person';
import contra from '../index';
import Sound from '../sound';

const keys = [
  'thiefJump',
  'thiefLie',
  'thiefRun',
  'thiefShot',
  'dip'
];

export default class Thief extends Person {
  constructor(xCenter, yBottom, vector, level) {
    super(xCenter, yBottom, 1, level.enemiesInfo, keys, contra.res.enemyS, level, 'enemyDeath');
    this.vectorMove = vector;
    this.score = 100;
    this.touchDemage = true;
    this.reloading = 5000;
    this.jumpReloading = 5000;
    this.maxShoot = 2;
    this.canShoot = true;
    this.shootCount = 0;

    this.isFlip = vector > 0;
    if (this.isFlip) {
      this.flip(1, 0);
    }
    this.pose = 'AIR'; // air , platform , water, death
    this.vectorJumpY = 1; // Направление силы притяжения. 1 - вниз. -1 - вверх
    this.moveSpeed = 1;
    this.fallSpeed = 1.8; //1.8;
    this.weapon = new Weapon('E', this, 100);
    this.selectState('thiefLie');

    this.checkPosition();
    level.enemyArray.push(this);
  }

  tryAction() {
    const camPos = contra.pjs.camera.getPosition().x;
    this.drawShadow();
    this.spritesMesh.draw();
    let spr = this.selectedState.sprite;
    if (camPos < spr.x + spr.w - 8 && camPos + 248 > spr.x) {
      this.checkColission(spr);
    }

    if (this.health > 0) {
      let dx = this.vectorMove * this.moveSpeed;
      let dy = 0;
      this.tryRemove(false, camPos);
      const collisionSArray = contra.selectedLevel.platformActual.filter(
        (platform) => platform.sprite.isStaticIntersect(this.states.thiefRun.sprite.getStaticBoxS(0, 28, 0, this.fallSpeed - 28)),
      );
      const buttomColArray = collisionSArray.filter((platform) => platform.collision === 'BOTTOM');
      const waterColArray = buttomColArray.length > 0 ? [] : collisionSArray.filter((platform) => platform.collision === 'WATER');
      if (this.moveSpeed > 0) {
        switch (this.pose) {
          case 'AIR':
            if (this.vectorJumpY < 0) {
              dy = this.fallSpeed * this.vectorJumpY;
            } else if (buttomColArray.length > 0) {

              dy = buttomColArray[0].sprite.y - (this.states.thiefRun.sprite.y + this.states.thiefRun.sprite.h);
              this.selectState('thiefRun');
              this.pose = 'PLATFORM';

            } else if (waterColArray.length > 0) {
              dy = waterColArray[0].sprite.y - (this.states.thiefRun.sprite.y + this.states.thiefRun.sprite.h);
              this.health = 0;
              this.selectState('dip');
              setTimeout(() => {
                this.tryRemove(true);
              }, 300);
              return;
            } else {
              dy = this.fallSpeed * this.vectorJumpY;
            }
            dx = this.vectorMove * this.moveSpeed;
            break;
          case 'PLATFORM':
            if (buttomColArray.length === 0) {
              dy -= this.fallSpeed;
              this.selectState('thiefJump');
              this.pose = 'AIR';
            } else {
              this.vectorJumpX = 0;
              const collisionSForwardArray = contra.selectedLevel.platformActual.filter(
                (platform) => platform.sprite.isStaticIntersect(this.states.thiefRun.sprite.getStaticBoxS(this.vectorMove > 0 ? 10 : 0, 28, 10 * this.vectorMove, this.fallSpeed - 28)),
              );
              if (collisionSForwardArray.length === 0) {
                const collisionSTop = contra.selectedLevel.platformActual.filter(
                  (platform) => platform.sprite.isStaticIntersect(this.states.thiefRun.sprite.getStaticBoxS(40 * this.vectorMove, -15, 0, 20)),
                );
                const collisionSBottom = contra.selectedLevel.platformActual.filter(
                  (platform) => platform.sprite.isStaticIntersect(this.states.thiefRun.sprite.getStaticBoxS(35 * this.vectorMove, 20, 0, 20)),
                );
                if (collisionSTop.length > 0) {
                  this.jump(true);
                } else if (collisionSBottom.length > 0) {
                  this.jump();
                } else {
                  if (Math.random() > 0.2) {
                    this.vectorMove *= -1;
                    this.flip(this.vectorMove === 1 ? 1 : 0, 0);
                    this.isFlip = !this.isFlip;
                  } else {
                    this.jump();
                  }
                }
              } else {
                dx = this.vectorMove * this.moveSpeed;
              }
            }
            break;
          default:
            break;
        }
      }
      if (this.pose === 'PLATFORM' && this.canShoot) {
        const player = contra.player.selectedState.sprite;
        const spr = this.selectedState.sprite;
        let wantShoot = false;
        let wantJump = false;
        if (this.vectorMove < 0) {
          wantShoot = player.isStaticIntersect(spr.getStaticBoxA(-100, 8, 100, -16));
          wantJump = player.isStaticIntersect(spr.getStaticBoxA(-16, -30));
        } else {
          wantShoot = player.isStaticIntersect(spr.getStaticBoxD(0, 8, 120, -16));
          wantJump = player.isStaticIntersect(spr.getStaticBoxD(16, -30));
        }
        if (wantJump) {
          this.jump(true);
          this.canShoot = false;
          setTimeout(() => {
            this.canShoot = true;
          }, this.reloading);
        } else if (wantShoot) {
          if (Math.random() > 0.7) {
            this.shoot();
          } else {
            this.canShoot = false;
            setTimeout(() => {
              this.canShoot = true;
            }, this.reloading);
          }

        }

      }

      if (dx !== 0) {
        let collV = [];
        if (dx > 0) {
          collV = this.level.platformActual.filter((platform) => platform.collision === 'VERTICAL' &&
            platform.sprite.isStaticIntersect(this.selectedState.sprite.getStaticBoxD(14, 0, -16 + this.moveSpeed)),
          );
        } else {
          collV = this.level.platformActual.filter((platform) => platform.collision === 'VERTICAL' &&
            platform.sprite.isStaticIntersect(this.selectedState.sprite.getStaticBoxA(4 - this.moveSpeed, 0, -12)),
          );
        }
        if (collV.length > 0 && collV[0] !== this.level.leftBorder) {
          dx = -dx;
          this.vectorMove *= -1;
          this.flip(this.vectorMove === 1 ? 1 : 0, 0);
          this.isFlip = !this.isFlip;
        }
      }


      this.spritesMesh.move(contra.pjs.vector.point(dx, dy));
      const spr = this.selectedState.sprite;
    } else if (this.health < 1 && this.selectedState.name !== 'death') {
      this.spritesMesh.move(contra.pjs.vector.point(this.isFlip ? -0.2 : 0.2, -0.3));
    }
  }


  die() {
    this.selectState('thiefJump');
    this.spritesMesh.move(contra.pjs.vector.point(this.isFlip ? -0.5 : 0.5, -0.9));
    setTimeout(() => {
      Sound.play('enemyDeath');
      this.selectState('death');
      setTimeout(() => {
        contra.addScore(this.score);
        this.tryRemove(true);
      }, 500);
    }, 300);
  }

  tryRemove(die, camPos) {
    if (die || !this.selectedState.sprite.isStaticIntersect(this.level.levelBorder.sprite.getStaticBox())) {
      this.level.enemyArray.splice(this.level.enemyArray.indexOf(this), 1);
    }
  }

  shoot() {
    this.canShoot = false;
    this.moveSpeed = 0;
    this.selectState(Math.random() > 0.5 ? 'thiefLie' : 'thiefShot');
    const degree = this.vectorMove === -1 ? Math.PI : 0;
    const state = this.selectedState;
    const x = degree === 0 ? state.sprite.x + state.sprite.w + 3 : state.sprite.x - 3;
    const y = state.sprite.y + 8;
    setTimeout(() => {
      const interval = setInterval(() => {
        if (this.health > 0) {
          this.weapon.shoot(degree, x, y);
        } else {
          clearInterval(interval);
        }
        this.shootCount += 1;
        if (this.shootCount >= this.maxShoot) {
          this.shootCount = 0;
          clearInterval(interval);
          if (this.health > 0) {
            setTimeout(() => {
              this.moveSpeed = 1;
              this.selectState('thiefRun');
            }, 300);

            setTimeout(() => {
              this.canShoot = true;
            }, this.reloading);
          }
        }
      }, 200);
    }, 200);
  }

  jump(isLong) {
    this.pose = 'AIR';
    this.vectorJumpY = -1;
    this.selectState('thiefJump');
    setTimeout(() => {
      if (this.vectorJumpY !== 1) {
        this.vectorJumpY = -0.1;
        setTimeout(() => {
          if (this.vectorJumpY !== 1) {
            this.vectorJumpY = 0.1;
            setTimeout(() => {
              this.vectorJumpY = 1;
            }, 50);
          }
        }, 50);
      }
    }, isLong ? 350 : 150);
  }

  checkPosition() {
    const spr = this.selectedState.sprite;
    const platforms = this.level.platformActual.filter(
      (platform) => platform.collision === 'BOTTOM' &&
      platform.sprite.isStaticIntersect(spr.getStaticBoxS(0, 0, -2, 200))
    );
    if (platforms.length > 0) {
      let minY = platforms[0].sprite.y;
      for (let i = 1; i < platforms.length; i += 1) {
        if (platforms[i].sprite.y < minY) {
          minY = platforms[i].sprite.y;
        }
      }
      this.spritesMesh.y = minY - spr.h - 1;
    }
  }
}