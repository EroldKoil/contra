/* eslint-disable */

import contra from './index';
import Player from './player';
import BulletL from './weapon/bulletL';
import Sound from './sound';

export default class Person {
  constructor(xCenter, yBottom, health, sprites, keys, image, level, typeOfDeath) {
    this.level = level;
    this.xCenter = xCenter;
    this.yBottom = yBottom;
    this.shadow = this.createSprite(contra.res.elementS, ...Object.values(level.elementsInfo['shadow']));

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
    if (camPos > this.xCenter - 256 - 16) {
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

  getDegree(round, spr, dy = 0, dx = 0) {
    const player = contra.player.selectedState.sprite;
    const plX = player.x + player.w / 2;
    const plY = player.y + (player.h / 2)
    const aimX = spr.x + spr.w / 2 + dx;
    const aimY = spr.y + spr.h / 2 + dy;
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
      if (this.health > 0 && bullet.needCheckCpllision &&
        ((bullet instanceof BulletL && aim.isDynamicIntersect(bullet.getBox())) || aim.isStaticIntersect(bullet.getBox()))) {
        this.health -= bullet.damage;
        bullet.tryRemove();
        if (this.health < 1) {
          this.die();
        } else {
          Sound.play('damage');
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

  getBox() {
    return this.selectedState.sprite; //.getStaticBox();
  }

  die() {
    contra.addScore(this.score);
    this.selectState('death');
    Sound.play('enemyDeath');
    setTimeout(() => {
      this.tryRemove(true);
    }, 500);
  }

  drawShadow() {
    const sh = this.shadow;
    const spr = this.selectedState.sprite;
    sh.x = spr.x + 1
    sh.w = spr.w - 2;
    const platforms = this.level.platformActual.filter(
      (platform) => platform.collision === 'BOTTOM' &&
      platform.sprite.isStaticIntersect(spr.getStaticBoxS(0, spr.h * 0.8, -2, 40))
    );
    if (platforms.length > 0) {
      let minY = platforms[0].sprite.y;
      for (let i = 1; i < platforms.length; i += 1) {
        if (platforms[i].sprite.y < minY) {
          minY = platforms[i].sprite.y;
        }
      }
      sh.y = minY - 2;
      sh.setAlpha(1 - ((sh.y - spr.y - spr.h) * 0.02));
      sh.draw();
    }
  }
}