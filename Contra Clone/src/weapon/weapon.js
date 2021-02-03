import Player from '../player';
import BulletM from './bulletM';
import BulletF from './bulletF';
import BulletL from './bulletL';

export default class Weapon {
  constructor(type, sniper, reloading = 1000, speed = 1) {
    this.level = sniper.level;
    this.sniper = sniper;
    this.reloading = reloading;
    this.speed = speed;
    this.canShoot = true;
    this.bulletArray = this.sniper instanceof Player
      ? this.level.playerBulletsArray
      : this.level.bulletsArray;
    this.changeWeapon(type, true);
  }

  setLevel(level) {
    this.level = level;
    this.bulletArray = this.sniper instanceof Player
      ? this.level.playerBulletsArray
      : this.level.bulletsArray;
  }

  shoot(vectorShoot, x, y) {
    const getDxy = (vector, speed = this.speed * this.apgreid) => [
      +(speed * Math.cos(vector)).toFixed(2), +(-speed * Math.sin(vector)).toFixed(2),
    ];

    let i = 0;
    let interval;
    const dXY = getDxy(vectorShoot);
    const xyCoef = getDxy(vectorShoot, 12);
    switch (this.type) {
      case 'D':
      case 'E':
      case 'M':
        this.bulletArray.push(new BulletM(x, y, ...getDxy(vectorShoot),
          this.level, this.bulletArray, this.type));
        break;
      case 'F':
        interval = setInterval(() => {
          this.bulletArray.push(new BulletF(x, y, ...getDxy(vectorShoot),
            this.level, this.bulletArray));
          i += 1;
          if (i === 3) {
            clearInterval(interval);
          }
        }, 100);
        break;
      case 'S':
        for (i = 0; i < 5; i += 1) {
          this.bulletArray.push(new BulletM(x, y, ...getDxy(vectorShoot - Math.PI / 9 + ((Math.PI / 18) * i)), this.level, this.bulletArray, 'S'));
        }
        break;
      case 'L':
        for (i = 0; i < 4; i += 1) {
          this.bulletArray.push(new BulletL(x + xyCoef[0] * i, y + xyCoef[1] * i,
            ...dXY, this.level, this.bulletArray));
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

  changeWeapon(type, first) {
    if (this.type === type) {
      return;
    }
    this.type = type;
    this.apgreid = 1;
    switch (type) {
      case 'E':
        this.reloading = !first ? 1000 : this.reloading;
        this.speed = !first ? 2 : this.speed;
        break;
      case 'D':
        this.reloading = !first ? 200 : this.reloading;
        this.speed = !first ? 3 : this.speed;
        break;
      case 'M':
        this.reloading = !first ? 150 : this.reloading;
        this.speed = !first ? 3.5 : this.speed;
        break;
      case 'F':
        this.reloading = !first ? 1200 : this.reloading;
        this.speed = !first ? 3 : this.speed;
        break;
      case 'S':
        this.reloading = !first ? 600 : this.reloading;
        this.speed = !first ? 3 : this.speed;
        break;
      case 'L':
        this.reloading = !first ? 800 : this.reloading;
        this.speed = !first ? 3 : this.speed;
        break;
      default:
        break;
    }
  }
}
