import Weapon from '../weapon/weapon';
import Person from '../person';
import contra from '../index';

const keys = [
  'turel',
  'turelShoot',
];

export default class Turel extends Person {
  constructor(xCenter, yBottom, level) {
    super(xCenter, yBottom, 10, level.enemiesInfo, keys, contra.res.enemyS, level, 'mediumBoom');
    this.touchDemage = true;
    this.weapon = new Weapon('M', this, 1000, 3);
    this.score = 300;
    this.selectState('turel');
  }

  tryAction() {
    this.drawShadow();
    this.spritesMesh.draw();
    const camPos = contra.pjs.camera.getPosition().x;
    this.tryRemove(false, camPos);

    if (this.health > 0) {
      this.checkColission(this.selectedState.sprite);

      if (this.health > 0) {
        if (this.weapon.canShoot) {
          this.weapon.shoot(Math.PI, this.xCenter - 18, this.yBottom - 25);
          this.selectState('turelShoot');
          setTimeout(() => {
            this.selectState('turel');
          }, 30);
          this.selectState('turelShoot');
        }
      }
    }
  }
}