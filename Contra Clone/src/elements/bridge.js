import sprObject from './../sprObject';
import Platform from './../platform';
import pjs from './../index';

export default class Bridge extends sprObject {
  constructor(blockCount, x, y, level) {
    super(x, y, 32, 32);

    this.sprites = [];
    this.boomSprites = [];
    this.platforms = [];
    this.blockCount = blockCount;
    this.started = false;
    for (let i = 0; i < blockCount; i++) {
      let bridgeNumber = i === 0 ? 1 : i === blockCount - 1 ? 3 : 2;
      this.sprites.push(this.createSprite(level.spritesInfo[`b${bridgeNumber}`], level.levelSprites, this.x + 32 * i, this.y));
      let p = new Platform(this.width - 4, 1, x + 32 * i, y + 6, 'BOTTOM', true);
      this.platforms.push(p);
      level.platformActual.push(p);
    }
    level.elementsArray.push(this);
  }

  isTimeToShow(level) {
    if (pjs.camera.getPosition().x > this.x - 260) {
      level.elementsActual.push(this);
      level.elementsArray.splice(level.elementsArray.indexOf(this), 1);
      console.log(level.elementsActual);
    }
  }

  tryAction(level) {
    if (pjs.camera.getPosition().x > this.x - 110 && !this.started) {
      this.started = true;
      this.boom(0, level);
      let i = 1;
      let interval = setInterval(() => {
        this.boom(i, level);
        i++;
        if (i == this.blockCount) {
          clearInterval(interval);
        }
      }, 1000);
    }
  }

  getSprites() {
    return [...this.sprites, ...this.boomSprites];
  }

  boom(i, level) {
    this.boomSprites.push(this.createSprite(level.elementsInfo['bigBoom'], level.elementSprites, this.x - 16 + 32 * i, this.y));
    setTimeout(() => {
      this.boomSprites.push(this.createSprite(level.elementsInfo['bigBoom'], level.elementSprites, this.x + 16 + 32 * i, this.y))
    }, 150);
    setTimeout(() => {
      this.boomSprites.push(this.createSprite(level.elementsInfo['bigBoom'], level.elementSprites, this.x + 32 * i, this.y - 16))
    }, 300);
    setTimeout(() => {
      this.boomSprites.push(this.createSprite(level.elementsInfo['bigBoom'], level.elementSprites, this.x + 32 * i, this.y))
      let booms = 0;
      let interval = setInterval(() => {
        this.boomSprites.splice(0, 1);
        booms++;
        if (booms === 3) {
          if (i === this.blockCount - 1) {
            level.elementsActual.splice(level.elementsActual.indexOf(this), 1);
          }
          clearInterval(interval);
        }
      }, 200);
    }, 450);

    level.platformActual.splice(level.platformActual.indexOf(this.platforms[i]), 1);
    this.sprites.splice(0, 1);
  }
}