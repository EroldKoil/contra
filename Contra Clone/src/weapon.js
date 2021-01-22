export default class Weapon {
  constructor(name, count) {
    this.name = name;
    this.reloading = 500;
    this.damage = 1;
    this.speed = 1;
    this.isApgreid = false;
  }

  shoot(sniper, vectorMove, vectorShoot, x, y) {
    sniper.canShoot = false;
    setTimeout(() => {
      sniper.canShoot = true;
    }, this.reloading);
  }
}
