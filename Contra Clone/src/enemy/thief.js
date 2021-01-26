/* eslint-disable */

import Weapon from '../weapon/weapon';
import Person from '../person';
import contra from '../index';

const keys = [
  'vorJump',
  'vorLie',
  'vorRun',
  'vorShot',
];

export default class Thief extends Person {
  constructor(xCenter, yBottom, vector, level) {
    super(xCenter, yBottom, 1, level.enemiesInfo, keys, contra.res.enemyS, level, 'enemyDeath');
    this.vectorMove = vector;

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
    this.vectorJumpX = 0; // -1 left, 1 right
    this.moveSpeed = 1.5;
    this.fallSpeed = 1.8;
    this.selectState('jump');
    this.weapon = new Weapon('E', this, 200);
    this.selectState('vorRun');

    level.elementsArray.push(this);
    console.log('add thief2');
  }

  tryAction() {



    const camPos = contra.pjs.camera.getPosition().x;
    this.tryRemove(false, camPos);



    if (this.health > 0) {

      const spr = this.selectedState.sprite;

      if (!this.isHidden) {
        this.checkColission(this.selectedState.sprite);
        if (this.health > 0) {
          if (this.type === 'HALF') {
            if (this.weapon.canShoot && this.canShot) {
              this.weapon.shoot(this.isFlip ? 0 : Math.PI, this.xCenter + (this.isFlip ? 13 : -13), this.yBottom - 12);
              this.canShot = false;
              this.hide(false);
            }
          } else {
            let degReal = this.getDegree(15, -11);
            let deg = degReal;
            if (deg % 45 !== 0) {
              if ((deg + 15) % 45 === 0) {
                deg += 15;
              } else {
                deg -= 15;
              }
            }
            deg = deg === 360 ? 0 : deg;
            deg = deg === 90 ? 135 : deg === 270 ? 225 : deg;

            if (this.isFlip) {
              switch (deg) {
                case 45:
                  deg = 135;
                  break;
                case 0:
                  deg = 180;
                  break;
                case 315:
                  deg = 225;
                  break;
                default:
                  break;
              }
            }
            if (`sniper${deg}` !== this.selectedState.name) {
              this.selectState(`sniper${deg}`);
            }

            degReal = Math.PI / 180 * degReal;
            if (this.weapon.canShoot && this.canShot) {
              let yCoef = 0;
              switch (deg) {
                case 45:
                case 135:
                  yCoef = -40;
                  break;
                case 0:
                case 180:
                  yCoef = -29;
                  break;
                case 315:
                case 225:
                  yCoef = -13;
                  break;
                default:
                  break;
              }
              this.weapon.shoot(degReal, this.xCenter + (this.isFlip ? spr.w / 2 : -10), this.yBottom + yCoef);
              this.selectState(`${this.selectedState.name}Shot`)
              this.shotCount += 1;
              if (this.shotCount > 2) {
                if (this.type === 'STAYH') {
                  this.canShot = false;
                  this.shotCount = 0;
                  this.hide(true);
                } else {
                  this.canShot = false;
                  this.shotCount = 0;
                  setTimeout(() => {
                    this.canShot = true;
                  }, this.reloading);
                }
              }
            }
          }
        }
      }
    } else if (this.health < 1 && this.selectedState.name !== 'death') {
      this.spritesMesh.move(contra.pjs.vector.point(this.isFlip ? -0.2 : 0.2, -0.3));
    }


    this.spritesMesh.draw();
  }


  die() {
    this.selectState('sniper180');
    this.spritesMesh.move(contra.pjs.vector.point(this.isFlip ? -0.5 : 0.5, -0.9));
    setTimeout(() => {
      this.selectState('death');
      setTimeout(() => {
        contra.score += 100;
        this.tryRemove(true);
      }, 500);
    }, 300);
  }
}