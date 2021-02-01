/* eslint-disable*/

import Player from '../player';
import BulletM from './bulletM';
import BulletF from './bulletF';
import BulletL from './bulletL';

export default class Weapon {
  constructor(type, sniper, reloading, speed) {
    this.level = sniper.level;
    this.sniper = sniper;
    this.reloading = reloading;
    this.speed = speed;
    this.canShoot = true;
    this.bulletArray = this.sniper instanceof Player ? this.level.playerBulletsArray : this.level.bulletsArray;
    this.changeWeapon(type);
  }

  setLevel(level) {
    this.level = level;
    this.bulletArray = this.sniper instanceof Player ? this.level.playerBulletsArray : this.level.bulletsArray;
  }

  shoot(vectorShoot, x, y) {
    const getDxy = (vector, speed = this.speed * this.apgreid) => [+(speed * Math.cos(vector)).toFixed(2), +(-speed * Math.sin(vector)).toFixed(2)];
    switch (this.type) {
      case 'D':
      case 'E':
      case 'M':
        this.bulletArray.push(new BulletM(x, y, ...getDxy(vectorShoot), this.level, this.bulletArray, this.type));
        break;
      case 'F':
        let i = 0;
        const interval = setInterval(() => {
          this.bulletArray.push(new BulletF(x, y, ...getDxy(vectorShoot), this.level, this.bulletArray));
          i += 1;
          if (i === 3) {
            clearInterval(interval);
          }
        }, 100);
        break;
      case 'S':
        for (let i = 0; i < 5; i += 1) {
          this.bulletArray.push(new BulletM(x, y, ...getDxy(vectorShoot - Math.PI / 9 + ((Math.PI / 18) * i)), this.level, this.bulletArray, 'S'));
        }
        break;
      case 'L':
        const dXY = getDxy(vectorShoot);
        const xyCoef = getDxy(vectorShoot, 12);
        for (let i = 0; i < 4; i++) {
          this.bulletArray.push(new BulletL(x + xyCoef[0] * i, y + xyCoef[1] * i, ...dXY, this.level, this.bulletArray));
        }
        break;
      default:
        break;
    }

    this.canShoot = false;
    setTimeout(() => {
      this.canShoot = true;
    }, this.reloading / this.apgreid);
  }

  upgrate() {
    this.apgreid = 1.2;
  }

  changeWeapon(type) {
    this.type = type;
    this.apgreid = 1;
    switch (type) {
      case 'E':
        this.reloading = this.reloading || 1200;
        this.speed = this.speed || 1.5;
        break;
      case 'D':
        this.reloading = this.reloading || 300;
        this.speed = this.speed || 3;
        break;
      case 'M':
        this.reloading = this.reloading || 200;
        this.speed = this.speed || 3;
        break;
      case 'F':
        this.speed = this.speed || 2;
        this.reloading = this.reloading || 1200;
        break;
      case 'S':
        this.reloading = this.reloading || 500;
        this.speed = this.speed || 3;
        break;
      case 'L':
        this.reloading = this.reloading || 1000;
        this.speed = this.speed || 4;
        break;
      default:
        break;
    }
  }
}