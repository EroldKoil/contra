/* eslint-disable */

import Weapon from '../weapon/weapon';
import Person from '../person';
import contra from '../index';

const keys = [
  'tankRB180',
  'tankRB150',
  'tankRB120',
  'tankRBOpen',
];

export default class TankBottom extends Person {
  constructor(xCenter, yBottom, level) {
    super(xCenter, yBottom, 8, level.enemiesInfo, keys, contra.res.enemyS, level, 'mediumBoom');
    this.weapon = new Weapon('E', this, 1000);
    this.selectState('none');
    level.elementsArray.push(this);
  }

  tryAction() {
    this.spritesMesh.draw();
    const camPos = contra.pjs.camera.getPosition().x;
    if (!this.started && camPos > this.xCenter - 230) {
      this.open();
    } else {
      this.tryRemove(false, camPos);
    }

    if (this.started) {
      this.checkColission(this.selectedState.sprite);

      if (this.health > 0) {
        let deg = this.getDegree(30, this.selectedState.sprite);
        deg = deg > 180 ? 180 : deg < 120 ? 120 : deg;
        if (`tankRB${deg}` !== this.selectedState.name) {
          this.selectState(`tankRB${deg}`);
        }
        deg = Math.PI / 180 * deg;
        if (this.weapon.canShoot) {
          this.weapon.shoot(deg, this.xCenter + Math.cos(deg) * 16, this.yBottom - 16 - Math.sin(deg) * 16);
        }
      }
    }
  }
  getSprites() {
    //  return [...this.sprites, ...this.boomSprites];
  }

  open() {
    this.selectState('tankRBOpen');
    setTimeout(() => {
      this.selectState('tankRB180');
      this.started = true;
    }, 480);
  }

  die() {
    contra.score += 100;
    this.selectState('death');
    setTimeout(() => {
      this.tryRemove(true);
    }, 500);
  }
}