/* eslint-disable */

import Person from '../person';
import contra from '../index';
import Sound from '../sound';

export default class SnowShoot extends Person {
  constructor(xCenter, yBottom, level) {
    super(xCenter, yBottom, 1, level.enemiesInfo, ['snowShoot'], contra.res.enemyS, level, 'enemyDeath');
    this.touchDemage = true;
    this.selectState('snowShoot');
    this.score = 10;
    this.vector = Math.PI / 180 * this.getDegree(1, this.selectedState.sprite);
    this.dV = Math.PI;
    this.speed = 0.3;
    this.level.enemyArray.push(this);
    this.count = 180;
    this.mode = 0;
  }

  tryAction() {
    this.spritesMesh.draw();
    if (this.health > 0) {
      const spr = this.selectedState.sprite;
      this.checkColission(spr);
      this.tryRemove(false);
      this.count--;
      const pi = Math.PI;

      if (this.count < 0) {
        this.mode = this.mode > 3 ? 0 : this.mode + 1;

        switch (this.mode) {
          case 0:
            this.speed = 0.3;
            this.dV = pi;
            this.count = 60;
            break;
          case 1:
            this.speed = 0.1;
            this.count = 60;
            break;
          case 2:
            this.speed = 3;
            this.dV = pi / 150;
            this.vector += Math.random() > 0.5 ? pi / 4 : -pi / 4;
            this.count = 70;
            break;
          case 3:
            this.count = 60;
            this.mode = 4;
            break;
          default:
            break;
        }
      }

      if (this.mode === 4) {
        this.speed = 0.3 + this.count / 40;
        this.dV = pi / 200 * (1 + this.count);
      }


      if (this.health > 0) {

        let deg = (pi / 180) * this.getDegree(45, this.selectedState.sprite, 4);

        if (Math.abs(this.vector - deg) >= pi) {
          deg = deg > pi ? deg - pi : deg + pi;
          let diff = this.vector - deg;
          this.vector += diff > 0 ? -this.dV : this.dV;
        } else {
          let diff = this.vector - deg;
          const minus = diff < 0;
          diff = Math.abs(diff) > this.dV ? this.dV : Math.abs(diff);
          if (minus) {
            diff = -diff;
          }
          this.vector -= diff;
        }

        if (this.vector > (2 * pi)) {
          this.vector = this.vector - (2 * pi);
        } else if (this.vector < 0) {
          this.vector = 2 * pi + this.vector;
        }
        //this.vector = deg;
      }
      const dx = +(this.speed * Math.cos(this.vector)).toFixed(2);
      const dy = +(-this.speed * Math.sin(this.vector)).toFixed(2);

      this.spritesMesh.move(contra.pjs.vector.point(dx, dy));
    }
  }

  tryRemove(die) {
    if (die || (!this.selectedState.sprite.isStaticIntersect(this.level.levelBorder.sprite.getStaticBox()) &&
        this.health > 0)) {
      this.level.enemyArray.splice(this.level.enemyArray.indexOf(this), 1);
    }
  }
}