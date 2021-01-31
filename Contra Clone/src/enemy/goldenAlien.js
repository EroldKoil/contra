/* eslint-disable */

import Person from '../person';
import contra from '../index';
import Sound from '../sound';

export default class GoldAlien extends Person {
  constructor(xCenter, yBottom, level, count) {
    super(xCenter, yBottom, 2, level.enemiesInfo, ['goldAlien'], contra.res.enemyS, level, 'enemyDeath');
    this.touchDemage = true;
    this.score = 30;
    this.selectState('goldAlien');

    this.vector = Math.PI / 180 * (this.getDegree(1, this.selectedState.sprite, 4) + 60 - (Math.random() * 120));
    this.dV = Math.PI / 16 * (count + 1); //* (count + 1) * (count + 1);
    this.speed = 0.7;
    this.isFlip = false;
    this.level.enemyArray.push(this);
    this.count = 0;
    setTimeout(() => {
      this.dV = Math.PI / 200;
    }, 6000);
  }

  tryAction() {
    this.spritesMesh.draw();
    if (this.health > 0) {
      const spr = this.selectedState.sprite;
      const player = contra.player.selectedState.sprite;
      this.checkColission(spr);
      this.tryRemove(false);
      this.count++;
      if (spr.x + spr.w / 2 < player.x + player.w / 2 && !this.isFlip) {
        this.flip(1, 0);
        this.isFlip = true;
      } else if (spr.x + spr.w / 2 > player.x + player.w / 2 && this.isFlip) {
        this.flip(0, 0);
        this.isFlip = false;
      }
      if (this.health > 0 && this.count > 60) {
        this.count = 0;

        const pi = Math.PI;
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