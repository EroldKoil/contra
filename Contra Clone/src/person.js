/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-cycle */
import contra from './index';
import TankInRock from './enemy/tankInRock';

export default class Person {
  constructor(xCenter, yBottom, health, sprites, keys, image, level) {
    if (this instanceof TankInRock) {
      // console.log(xCenter, yBottom, health, sprites, keys, image, level);
    }
    this.level = level;
    this.xCenter = xCenter;
    this.yBottom = yBottom;

    this.states = {};
    this.dontShoot = true; // flag to understand? am I shoot now
    const spritesArr = [];
    keys.forEach((key) => {
      const sp = this.createSprite(...Object.values(sprites[key]), image, xCenter, yBottom);
      this.states[key] = { name: key, sprite: sp };
      spritesArr.push(sp);
    });

    this.spritesMesh = contra.pjs.game.newMesh({
      x: xCenter,
      y: yBottom,
      add: spritesArr,
    });

    this.vectorMove = 1;
    this.canShoot = true;

    this.health = health;
    this.moveSpeed = 1;
    this.fallSpeed = 1.8;
  }

  selectState(stateName) {
    if (this.dontShoot || stateName === 'jump' || stateName === 'fall' || stateName === 'swim_top_forward' || stateName === 'swim_top' || stateName === 'dip') {
      for (const key in this.states) {
        if (key === stateName) {
          this.states[key].sprite.visible = true;
          this.selectedState = this.states[key];
        } else {
          this.states[key].sprite.visible = false;
        }
      }
    }
  }

  createSprite(xS, yS, w, h, frames, delay, xCoef, yCoef, image, xCenter, yBottom) {
    return contra.pjs.game.newAnimationObject({
      animation: image.getAnimation(xS, yS, w, h, frames),
      x: xCenter - (w / 2) + xCoef,
      y: yBottom - h + yCoef,
      w,
      h,
      delay,
    });
  }
}