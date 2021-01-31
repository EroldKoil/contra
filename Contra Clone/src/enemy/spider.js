/* eslint-disable */

import Weapon from '../weapon/weapon';
import Person from '../person';
import contra from '../index';
import Sound from '../sound';

const keys = [
  'lichinka',
  'spider',
  'spiderJump',
];

export default class Spider extends Person {
  constructor(xCenter, yBottom, isFlipY, level) {
    super(xCenter, yBottom, 2, level.enemiesInfo, keys, contra.res.enemyS, level, 'enemyDeath');
    this.vectorMove = xCenter > contra.player.spritesMesh.x ? -1 : 1;
    this.score = 40;
    this.isFlipY = isFlipY;
    this.touchDemage = true;
    this.isFlipX = this.vectorMove > 0 ? 1 : 0;
    this.canFallDown = true;

    this.flip(0, isFlipY);
    this.pose = 'AIR'; // air , platform, death
    this.vectorJumpY = isFlipY === 1 ? 1 : -1; // Направление силы притяжения. 1 - вниз. -1 - вверх
    this.moveSpeed = 0.6;
    this.fallSpeed = 1.8;
    this.selectState('lichinka');

    level.enemyArray.push(this);
    setTimeout(() => {
      this.fallSpeed *= 0.33;
      setTimeout(() => {
        this.vectorJumpY *= -1;
        setTimeout(() => {
          this.fallSpeed *= 3;
        }, 200);
      }, 200);
    }, 400);
  }

  tryAction() {
    this.spritesMesh.draw();
    if (this.health > 0) {
      this.checkColission(this.selectedState.sprite);
    }

    if (this.health > 0) {
      let dx = this.vectorMove * this.moveSpeed;
      let dy = 0;
      this.tryRemove(false, contra.pjs.camera.getPosition().x);


      const spr = this.states.spider.sprite;
      const player = contra.player.selectedState.sprite;

      if (this.canFallDown) {
        this.mayFallDown(spr, player);
      }


      let collisionArray;
      if (this.vectorJumpY === 1) {
        collisionArray = contra.selectedLevel.platformActual.filter((platform) =>
          platform.collision === 'BOTTOM' && platform.sprite.isStaticIntersect(spr.getStaticBoxS(0, this.fallSpeed, 0, 0))
        );
      } else {
        collisionArray = contra.selectedLevel.platformActual.filter((platform) =>
          platform.collision === 'ROOF' && platform.sprite.isStaticIntersect(spr.getStaticBoxW(0, -this.fallSpeed, 0, 0))
        );
      }

      switch (this.pose) {
        case 'AIR':
          if (collisionArray.length > 0) {
            const platform = collisionArray[0].sprite;
            if (this.vectorJumpY < 0) {
              dy = (platform.y + platform.h) - spr.y;
            } else {
              dy = platform.y - (spr.y + spr.h);
            }
            this.pose = 'PLATFORM';
            this.selectState('spider');
            this.moveSpeed = 1.2;
            if (this.isFlipY === 0 && (spr.x + spr.w / 2) < (player.x + player.w / 2) && Math.random() < 0.1) {
              this.flip(1, 0);
              this.vectorMove = 1;
            }
          } else {
            dy = this.fallSpeed * this.vectorJumpY;
          }
          break;
        case 'PLATFORM':
          if (collisionArray.length === 0) {
            dy -= this.fallSpeed * this.vectorJumpY;
            this.selectState('spiderJump');
            this.pose = 'AIR';
          }
          if (spr.x > this.level.length + 200) {
            this.flip(0, 1);
            this.isFlipY = 1;
            this.vectorJumpY = -1;
            this.vectorMove = -1;
            this.pose = 'AIR';
            this.selectState('spiderJump');
          }
          break;
        default:
          break;
      }
      this.spritesMesh.move(contra.pjs.vector.point(dx, dy));
    }
  }

  mayFallDown(spr, player) {
    const diff = (spr.x + spr.w / 2) - (player.x + player.w / 2);
    if (this.isFlipY === 1 && diff < 60 && diff > 50) {
      if (Math.random() < 0.5) {
        this.canFallDown = false;
        return;
      }
      this.flip(0, 0);
      this.isFlipY = 0;
      this.vectorJumpY = 1;
      this.pose = 'AIR';
      this.selectState('spiderJump');
    }
  }

  tryRemove(die, camPos) {
    if (die || camPos > this.spritesMesh.x + 20) {
      console.log('remove')
      this.level.enemyArray.splice(this.level.enemyArray.indexOf(this), 1);
    }
  }

  jump(isLong) {
    this.pose = 'AIR';
    this.vectorJumpY = -1;
    this.selectState('thiefJump');
    setTimeout(() => {
      if (this.vectorJumpY !== 1) {
        this.vectorJumpY = -0.1;
        setTimeout(() => {
          if (this.vectorJumpY !== 1) {
            this.vectorJumpY = 0.1;
            setTimeout(() => {
              this.vectorJumpY = 1;
            }, 50);
          }
        }, 50);
      }
    }, 350);
  }
}