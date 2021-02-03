import Element from './element';
import Platform from '../platform';
import contra from '../index';
import Sound from '../sound';

export default class Bridge extends Element {
  constructor(blockCount, x, y, level) {
    super(x, y, 32, 32, level);

    this.sprites = [];
    this.boomSprites = [];
    this.platforms = [];
    this.blockCount = blockCount;
    this.started = false;
    for (let i = 0; i < blockCount; i += 1) {
      let bridgeNumber = 1;
      switch (i) {
        case 0:
          bridgeNumber = 1;
          break;
        case blockCount - 1:
          bridgeNumber = 3;
          break;
        default:
          bridgeNumber = 2;
          break;
      }
      this.sprites.push(this.createSprite(level.spritesInfo[`b${bridgeNumber}`], contra.res.levelS[0], this.x + 32 * i, this.y));
      const p = new Platform(this.width - 4, 1, x + 32 * i, y + 6, 'BOTTOM', true);
      this.platforms.push(p);
      level.platformActual.push(p);
    }
  }

  tryAction() {
    if (contra.pjs.camera.getPosition().x > this.x - 110 && !this.started) {
      this.started = true;
      this.boom(0);
      let i = 1;
      const interval = setInterval(() => {
        this.boom(i);
        i += 1;
        if (i === this.blockCount) {
          clearInterval(interval);
        }
      }, 1000);
    }
    [...this.sprites, ...this.boomSprites].forEach((sp) => {
      try {
        sp.draw();
      } catch (error) {}
    });
  }

  boom(i) {
    Sound.play('explosion');
    const addBoom = (x, y) => {
      this.boomSprites.push(this.createSprite(
        this.level.elementsInfo.bigBoom, contra.res.elementS, x, y,
      ));
    };

    addBoom(this.x - 16 + 32 * i, this.y);
    setTimeout(() => { addBoom(this.x + 16 + 32 * i, this.y); }, 150);
    setTimeout(() => { addBoom(this.x + 32 * i, this.y - 16); }, 300);
    setTimeout(() => {
      addBoom(this.x + 32 * i, this.y);
      let booms = 0;
      const interval = setInterval(() => {
        this.boomSprites.splice(0, 1);
        booms += 1;
        if (booms === 3) {
          if (i === this.blockCount - 1) {
            this.level.elementsActual.splice(this.level.elementsActual.indexOf(this), 1);
          }
          clearInterval(interval);
        }
      }, 200);
    }, 450);

    this.level.platformActual.splice(this.level.platformActual.indexOf(this.platforms[i]), 1);
    this.sprites.splice(0, 1);
  }
}