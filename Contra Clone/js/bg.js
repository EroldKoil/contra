/*import { game, contra, tiles } from './index.js';
import Platform from './platform.js';*/

class Bg extends sprObject {
  constructor(name, spriteInfo, levelSprites, width, height, x, y, level, canJumpDown) {
      super(x, y, width, height);

      switch (name) {
        case 'p1':
        case 'pw1':
        case 'pw2':
          this.platforms = [new Platform(width - 4, 3, x + 2, y + 6, 'BOTTOM', canJumpDown)];
          break;
        case 'p2':
          this.platforms = [new Platform(width - 4, 3, x + 2, y + height / 2 + 6, 'BOTTOM', canJumpDown)];
          break;
        case 'w':
        case 'w2':
        case 'w3':
        case 'w6':
        case 'w8':
          if (y > 190) {
            this.platforms = [new Platform(width, 3, x, y + height / 2, 'WATER')];
          }
          break;
        case 'w4':
          this.platforms = [
            new Platform(3, height, x + width + 3, y + 6, 'WATERLEFT'),
            new Platform(width, 3, x, y + height / 2, 'WATER')
          ];
          break;
        case 'w5':
          this.platforms = [
            new Platform(3, height, x - 6, y + 6, 'WATERRIGHT'),
            new Platform(width, 3, x, y + height / 2, 'WATER')
          ];
          break;
        default:
          break;
      }

      this.sprite = game.newAnimationObject({
        animation: levelSprites.getAnimation(spriteInfo.x, spriteInfo.y, this.width, this.height, spriteInfo.w / this.height),
        x: this.x,
        y: this.y,
        w: this.width,
        h: this.height,
        delay: spriteInfo.delay ? spriteInfo.delay : 100,
      });

      level.bgArray.push(this);
      if (this.platforms) {
        this.platforms.forEach((el) => { el.addToActual(level) });
      }
    }
    /*
      tryToActual(level, needRemove) {
        if (this.x < camera.getPosition().x + contra.options.screenWidth * 1.5) {
          this.addToActual(level, needRemove);
          return true;
        }
        return false;
      }

      addToActual(level, needRemove) {
        level.bgActual.push(this);
        if (needRemove) {
          level.bgArray.splice(level.bgArray.indexOf(this), 1);
        }
        if (this.platforms) {
          this.platforms.forEach((el) => { el.addToActual(level) });
        }
      }*/
}