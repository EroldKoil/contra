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
    this.score = 20;
    this.touchDemage = true;
    this.reloading = 2000;
    this.maxShot = 3;
    this.canShot = true;
    this.shotCount = 0;
    this.canShoot = true;

    this.isFlip = vector > 0;
    if (this.isFlip) {
      this.flip(1, 0);
    }
    this.pose = 'AIR'; // air , platform , water, death
    this.vectorJumpY = 1; // Направление силы притяжения. 1 - вниз. -1 - вверх
    this.moveSpeed = 0.9;
    this.fallSpeed = 1.8;
    this.weapon = new Weapon('E', this, 200);
    this.selectState('thiefJump');

    level.elementsArray.push(this);
  }

  tryAction() {
    const camPos = contra.pjs.camera.getPosition().x;
    this.drawShadow();
    this.spritesMesh.draw();
    this.checkColission(this.selectedState.sprite);
    if (this.health > 0) {
      let dx = this.vectorMove * this.moveSpeed;
      let dy = 0;
      this.tryRemove(false, camPos);
      const collisionSArray = contra.selectedLevel.platformActual.filter(
        (platform) => platform.sprite.isStaticIntersect(this.states.thiefRun.sprite.getStaticBoxS(0, 28, 0, this.fallSpeed - 28)),
      );
      const buttomColArray = collisionSArray.filter((platform) => platform.collision === 'BOTTOM');
      const waterColArray = buttomColArray.length > 0 ? [] : collisionSArray.filter((platform) => platform.collision === 'WATER');

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
                if (Math.random() > 0.5) {
                  this.vectorMove *= -1;
                  this.flip(this.vectorMove === 1 ? 1 : 0, 0);
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
    if (die || camPos > this.spritesMesh.x + 20) {
      console.log('remove')
      this.level.enemyArray.splice(this.level.enemyArray.indexOf(this), 1);
    }
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
}