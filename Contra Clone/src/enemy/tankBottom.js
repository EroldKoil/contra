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
    console.log('TankBottom');
    super(xCenter, yBottom, 15, level.enemiesInfo, keys, contra.res.enemyS, level);
    console.log('TankBottom after');
    this.health = 10;
    this.level = level;
    this.weapon = new Weapon('E', this, 1000, 1, 1.5);
    this.selectState('none');
    level.elementsArray.push(this);
  }

  tryAction() {
    this.spritesMesh.draw();
    const camPos = contra.pjs.camera.getPosition().x;
    if (!this.started && camPos > this.xCenter - 210) {
      this.open();
    } else {
      this.tryRemove(camPos);
    }

    if (this.started) {

      let deg = this.getDegree(30);
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
  getSprites() {
    //  return [...this.sprites, ...this.boomSprites];
  }

  open() {
    this.selectState('tankRBOpen');
    setTimeout(() => {
      this.selectState('tankRB180');
      this.started = true;
    }, 640);
  }

}