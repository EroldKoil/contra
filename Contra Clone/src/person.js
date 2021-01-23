/* eslint-disable */

import contra from './index';
// import TankBottom from './enemy/tankBottom';

export default class Person {
  constructor(xCenter, yBottom, health, sprites, keys, image, level) {
    // if (this instanceof TankBottom) {
    //console.log(xCenter, yBottom, health, sprites, keys, image, level);
    //  }
    this.level = level;
    this.xCenter = xCenter;
    this.yBottom = yBottom;

    this.states = {};
    this.dontShoot = true; // flag to understand? am I shoot now
    const spritesArr = [];
    keys.forEach((key) => {
      const sp = this.createSprite(...Object.values(sprites[key]), image);
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
    this.moveSpeed = 2;
    this.fallSpeed = 1.8;
  }

  createSprite(xS, yS, w, h, frames, delay, xCoef, yCoef, image) {
    return contra.pjs.game.newAnimationObject({
      animation: image.getAnimation(xS, yS, w, h, frames),
      x: -(w / 2) + xCoef,
      y: -h + yCoef,
      w,
      h,
      delay,
    });
    /*
    return contra.pjs.game.newAnimationObject({
      animation: image.getAnimation(xS, yS, w, h, frames),
      x: this.xCenter - (w / 2) + xCoef,
      y: this.yBottom - h + yCoef,
      w,
      h,
      delay,
    });*/
  }

  isTimeToShow() {
    if (contra.pjs.camera.getPosition().x > this.xCenter - 300) {
      this.level.enemyArray.push(this);
      this.level.elementsArray.splice(this.level.elementsArray.indexOf(this), 1);
    }
  }

  selectState(stateName) {
    for (const key in this.states) {
      if (key === stateName) {
        this.states[key].sprite.visible = true;
        this.selectedState = this.states[key];
      } else {
        this.states[key].sprite.visible = false;
      }
    }
  }

  getDegree(round) {
    const player = contra.player.selectedState.sprite;
    const plX = player.x + player.w / 2;
    const plY = player.y + (player.h / 2)
    const aimX = this.xCenter;
    const aimY = this.yBottom - 16;
    let deg = Math.atan(-(aimY - plY) / (aimX - plX));

    if (plX > aimX) {
      if (plY > aimY) {
        deg = 2 * Math.PI + deg;
      }
    } else {
      deg = Math.PI + deg;
    }
    deg = Math.round(180 / Math.PI * deg / round) * round;
    return deg === 360 ? 0 : deg;
  }

  tryRemove(camPos) {
    if (camPos > this.xCenter + 20) {
      this.level.enemyArray.splice(this.level.elementsArray.indexOf(this), 1);
    }
  }
}