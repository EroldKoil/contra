import Player from './../player';
import BulletM from './bulletM';
import BulletF from './bulletF';
import BulletL from './bulletL';

export default class Weapon {
  constructor(type, sniper) {
    this.level = sniper.level;
    this.sniper = sniper;
    this.reloading = 300;
    this.damage = 1;
    this.speed = 3;
    this.canShoot = true;
    this.bulletArray = this.sniper instanceof Player ? this.level.playerBulletsArray : this.level.bulletsArray;
    this.changeWeapon(type);
  }



  shoot(vectorShoot, x, y) {
    let getDxy = (vector) => {
      return [+(this.speed * Math.cos(vector)).toFixed(2), +(-this.speed * Math.sin(vector)).toFixed(2)];
    }
    switch (this.type) {
      case 'D':
        this.bulletArray.push(new BulletM(x, y, ...getDxy(vectorShoot), this.level, 'D'));
        break;
      case 'M':
        this.bulletArray.push(new BulletM(x, y, ...getDxy(vectorShoot), this.level, 'M'));
        break;
      case 'F':
        this.bulletArray.push(new BulletF(x, y, ...getDxy(vectorShoot), this.level));
        break;
      case 'S':
        for (let i = 0; i < 5; i++) {
          this.bulletArray.push(new BulletM(x, y, ...getDxy(vectorShoot - Math.PI / 6 + (Math.PI / 12 * i)), this.level, 'S'));
        }
        break;
      case 'L':
        this.bulletArray.push(new BulletL(x, y, ...getDxy(vectorShoot), this.level));
        break;
      default:
        break;
    }

    this.canShoot = false;
    setTimeout(() => {
      this.canShoot = true;
    }, this.reloading);
  }

  upgrate() {
    this.isApgreid = true;
  }

  changeWeapon(type) {
    this.type = type;
    this.isApgreid = false;
    switch (type) {
      case 'D':

        break;
      case 'M':
        this.reloading = 200;
        break;
      case 'F':
        this.speed = 2;
        this.reloading = 1200;
        break;
      case 'S':

        break;
      case 'L':
        this.reloading = 1000;
        break;
      default:
        break;
    }
  }
}