/* eslint-disable */

import contra from './index';
import Player from './player';
import BulletL from './weapon/bulletL'

export default class Person {
  constructor(xCenter, yBottom, health, sprites, keys, image, level, typeOfDeath) {
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
      const sp = this.createSprite(image, ...Object.values(sprites[key]));
      this.states[key] = { name: key, sprite: sp };
      spritesArr.push(sp);
    });

    if (!(this instanceof Player)) {
      const sp = this.createSprite(contra.res.elementS, ...Object.values(level.elementsInfo[typeOfDeath]));
      this.states['death'] = { name: 'death', sprite: sp };
      spritesArr.push(sp);
    }

    this.spritesMesh = contra.pjs.game.newMesh({
      x: xCenter,
      y: yBottom,
      add: spritesArr,
    });

    this.health = health;
  }

  createSprite(image, xS, yS, w, h, frames = 1, delay = 100, xCoef = 0, yCoef = 0) {
    return contra.pjs.game.newAnimationObject({
      animation: image.getAnimation(xS, yS, w, h, frames),
      x: -(w / 2) + xCoef,
      y: -h + yCoef,
      w,
      h,
      delay,
    });
  }

  isTimeToShow(camPos) {
    if (camPos > this.xCenter - 300) {
      this.level.enemyArray.push(this);
      this.level.elementsArray.splice(this.level.elementsArray.indexOf(this), 1);
    }
  }

  selectState(stateName, selectByTime) {
    if (!selectByTime || this.health > 0) {
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

  getDegree(round, dy = 0, dx = 0) {
    const player = contra.player.selectedState.sprite;
    const plX = player.x + player.w / 2;
    const plY = player.y + (player.h / 2)
    const aimX = this.xCenter + dx;
    const aimY = this.yBottom - 16 + dy;
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

  // Проверка объекта на столкновение с пулей
  checkColission(aim) {
    this.level.playerBulletsArray.forEach(bullet => {
      if (this.health > 0 && ((bullet instanceof BulletL && aim.isDynamicIntersect(bullet.getBox())) ||
          aim.isStaticIntersect(bullet.getBox()))) {
        this.health -= bullet.damage;
        bullet.crash(this.level.playerBulletsArray);
        if (this.health < 1) {
          this.die();
        }
      }
    });
  }

  flip(x, y) {
    for (const key in this.states) {
      this.states[key].sprite.setFlip(x, y);
    }
  }

  tryRemove(die, camPos) {
    if (die || camPos > this.xCenter + 50) {
      this.level.enemyArray.splice(this.level.enemyArray.indexOf(this), 1);
    }
  }
}