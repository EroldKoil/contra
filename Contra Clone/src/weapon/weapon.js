import Player from './../player';
import BulletM from './bulletM';
import BulletF from './bulletF';

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
      return [this.speed * Math.cos(vector), -this.speed * Math.sin(vector)]
    }
    switch (this.type) {
      case 'D':
        this.bulletArray.push(new BulletM(x, y, ...getDxy(vectorShoot), this.level, false));
        break;
      case 'M':
        this.bulletArray.push(new BulletM(x, y, ...getDxy(vectorShoot), this.level, true));
        break;
      case 'F':
        this.bulletArray.push(new BulletF(x, y, ...getDxy(vectorShoot), this.level, true));
        break;
      case 'S':
        for (let i = 0; i < 5; i++) {
          /* let dx = this.speed * Math.cos(vectorShoot - 30 + 15 * i);
           let dy = -this.speed * Math.sin(vectorShoot - 30 + 15 * i);*/
          this.bulletArray.push(new BulletM(x, y, ...getDxy(vectorShoot - Math.PI / 6 + (Math.PI / 12 * i)), this.level, true));
        }
        //this.bulletArray.push(new BulletM(x, y, dx, dy, this.level, true));
        break;
      case 'L':

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

        break;
      case 'F':

        break;
      case 'S':

        break;
      case 'L':

        break;
      default:
        break;
    }
  }
}