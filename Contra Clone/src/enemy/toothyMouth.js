import Person from '../person';
import contra from '../index';
import SnowShoot from './snowShoot';

export default class ToothyMouth extends Person {
  constructor(xCenter, yBottom, level) {
    super(xCenter, yBottom, 8, level.enemiesInfo, ['toothyMouth'], contra.res.enemyS, level, 'mediumBoom');
    this.selectState('toothyMouth');
    this.score = 1000;
    this.reloading = 4000;
    this.canShoot = true;
    this.aim = contra.pjs.game.newRectObject({
      x: xCenter - 10,
      y: yBottom - 30,
      w: 20,
      h: 28,
    });
  }

  tryAction() {
    this.spritesMesh.draw();
    const camPos = contra.pjs.camera.getPosition().x;
    this.tryRemove(false, camPos);

    if (this.health > 0) {
      this.checkColission(this.aim);
      if (this.health > 0 && this.canShoot) {
        new SnowShoot(this.xCenter, this.yBottom, this.level);
        this.canShoot = false;
        setTimeout(() => {
          this.canShoot = true;
        }, this.reloading);
      }
    }
  }
}