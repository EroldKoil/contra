/*import { game, contra, tiles } from './index.js';*/
import Platform from './platform.js';
import sprObject from './sprObject';

export default class Bg extends sprObject {
  constructor(name, spriteInfo, width, height, x, y, level, canJumpDown, pjs) {
      super(x, y, width, height);

      switch (name) {
        case 'p1':
        case 'pw1':
        case 'pw2':
          this.platforms = [new Platform(width - 4, 1, x + 2, y + 6, 'BOTTOM', canJumpDown, pjs)];
          break;
        case 'p2':
          this.platforms = [new Platform(width - 4, 1, x + 2, y + height / 2 + 6, 'BOTTOM', canJumpDown, pjs)];
          break;
        case 'w':
        case 'w2':
        case 'w3':
        case 'w6':
        case 'w8':
          if (y > 190) {
            this.platforms = [new Platform(width, 3, x, y + height / 2, 'WATER', canJumpDown, pjs)];
          }
          break;
        case 'w4':
          this.platforms = [
            new Platform(3, height, x + width + 3, y + 6, 'WATERLEFT', canJumpDown, pjs),
            new Platform(width, 3, x, y + height / 2, 'WATER', canJumpDown, pjs)
          ];
          break;
        case 'w5':
          this.platforms = [
            new Platform(3, height, x - 6, y + 6, 'WATERRIGHT', canJumpDown, pjs),
            new Platform(width, 3, x, y + height / 2, 'WATER', canJumpDown, pjs)
          ];
          break;
        default:
          break;
      }

      this.sprite = this.createSprite(spriteInfo, level, pjs.game, this.x, this.y);
      /*	game.newAnimationObject({
        animation: level.levelSprites.getAnimation(spriteInfo.x, spriteInfo.y, this.width, this.height, spriteInfo.w / this.height),
        x: this.x,
        y: this.y,
        w: this.width,
        h: this.height,
        delay: spriteInfo.delay ? spriteInfo.delay : 100,
      });*/

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
