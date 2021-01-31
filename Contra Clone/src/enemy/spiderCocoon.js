/* eslint-disable */

import Person from '../person';
import contra from '../index';
import Spider from './spider';
import Sound from '../sound';

const keys = [
  'kokon',
  'kokonDie',
  'kokonClose',
];

export default class SpiderCocoon extends Person {
  constructor(xCenter, yBottom, isFlip, level) {
    super(xCenter, yBottom, 4, level.enemiesInfo, keys, contra.res.enemyS, level, 'enemyDeath');
    this.selectState('kokonClose');
    this.score = 200;
    this.reloading = 4000;
    this.isFlip = isFlip;
    this.flip(0, isFlip);
    this.canShoot = true;
    const spr = this.selectedState.sprite;
    this.aim = contra.pjs.game.newRectObject({ x: spr.x + 4, y: spr.y + 2, w: spr.w - 8, h: spr.h - 2 });
    level.elementsArray.push(this);
  }

  tryAction() {
    this.spritesMesh.draw();
    const camPos = contra.pjs.camera.getPosition().x;
    this.tryRemove(false, camPos);
    const state = this.selectedState.name;
    if (state === 'kokonClose' && camPos > this.xCenter - 250) {
      this.selectState('kokon');
    } else if (this.health > 0 && state === 'kokon') {
      this.checkColission(this.aim);
      if (this.health > 0 && this.canShoot) {
        new Spider(this.xCenter, this.yBottom, this.isFlip, this.level);
        this.canShoot = false;
        setTimeout(() => {
          this.canShoot = true;
        }, this.reloading);
      }
    }
  }
  die() {
    contra.addScore(this.score);
    this.selectState('kokonDie');
    this.states.death.sprite.visible = true;
    Sound.play('enemyDeath');
    setTimeout(() => {
      this.states.death.sprite.visible = false;
    }, 500);
  }
}