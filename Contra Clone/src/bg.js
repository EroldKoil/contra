/* eslint-disable */

import Platform from './platform.js';
import SprObject from './sprObject';
import contra from './index';

export default class Bg extends SprObject {
  constructor(name, spriteInfo, width, height, x, y, level, canJumpDown, needVertPlatform, isRoof) {
    super(x, y, width, height);
    this.platforms = [];
    switch (name) {
      case 'a1': // вертикальные на всю ширину
        if (needVertPlatform) {
          this.platforms = [new Platform(width - 4, 38, x + 2, y - 5, 'VERTICAL', false)];
        }
        break;
      case 'd30':
        if (needVertPlatform) {
          this.platforms = [new Platform(width / 2 - 2, 38, x + width / 2 + 2, y - 5, 'VERTICAL', false)];
        }
        break;
      case 'k2': // вертикальные правая половина
        this.platforms = [new Platform(width / 2 - 2, 38, x + width / 2 + 2, y - 5, 'VERTICAL', false)];
        break;
      case 'k3': // вертикальные левая половина
        this.platforms = [new Platform(width / 2 - 2, 38, x, y - 5, 'VERTICAL', false)];
        break;
      case 'k4': // вертикальные правая половина + низ
        this.platforms = [
          new Platform(width / 2 - 2, 26, x + width / 2 + 2, y + 7, 'VERTICAL', false),
          new Platform(width / 2 - 2, 2, x + width / 2 + 2, y + 6, 'BOTTOM', false)
        ];
        break;
      case 'k3': // вертикальные левая половина + низ
        this.platforms = [
          new Platform(width / 2 - 2, 38, x, y - 5, 'VERTICAL', false),
          new Platform(width / 2 - 2, 2, x, y + 6, 'BOTTOM', false)
        ];
        break;
      case 'p1':
      case 'p4':
      case 'p5':
      case 'p22':
      case 'pw1':
      case 'pw2': // целая ширина Верх
        this.platforms = [new Platform(width - 4, 1, x + 2, y + 6, 'BOTTOM', canJumpDown)];
        if (needVertPlatform) {
          this.platforms.push(new Platform(width - 4, 38, x + 2, y - 5, 'VERTICAL', false));
        }
        break;
      case 'p17': // целая ширина Верх + Вертикаль на всю ширину
        this.platforms = [
          new Platform(width - 4, 1, x + 2, y + 6, 'BOTTOM', canJumpDown),
          new Platform(width - 4, 38, x + 2, y + 7, 'VERTICAL', false)
        ];
        break;
      case 'p2':
      case 'p3':
      case 'p6':
      case 'p7':
      case 'p8':
      case 'p9':
      case 'p11':
      case 'p18':
      case 'p19':
      case 'p23': // целая ширина Центр
        this.platforms = [new Platform(width - 4, 1, x + 2, y + height / 2 + 6, 'BOTTOM', canJumpDown)];
        break;
      case 'p12': // правая половина Верх
        this.platforms = [new Platform(width / 2 - 2, 1, x + width / 2 + 2, y + 6, 'BOTTOM', canJumpDown)];
        break;
      case 'p10': // правая половина Центр
      case 'p15':
        this.platforms = [new Platform(width / 2 - 2, 1, x + width / 2 + 2, y + height / 2 + 6, 'BOTTOM', canJumpDown)];
        break;
      case 'p14': // Левая половина Центр
      case 'p21':
        this.platforms = [new Platform(width / 2 - 2, 1, x, y + height / 2 + 6, 'BOTTOM', canJumpDown)];
        break;
      case 'w':
      case 'w2':
      case 'w3':
      case 'w6':
      case 'w8':
        if (y > 190) {
          this.platforms = [new Platform(width, 3, x, y + height / 2, 'WATER', canJumpDown)];
        }
        break;
      case 'w4':
        this.platforms = [
          new Platform(3, height, x + width + 3, y + 6, 'WATERLEFT', canJumpDown),
          new Platform(width, 3, x, y + height / 2, 'WATER', canJumpDown),
        ];
        break;
      case 'w5':
        this.platforms = [
          new Platform(3, height, x - 6, y + 6, 'WATERRIGHT', canJumpDown),
          new Platform(width, 3, x, y + height / 2, 'WATER', canJumpDown),
        ];
        break;
      default:
        break;
    }

    if (isRoof) {
      this.platforms.push(new Platform(width - 4, 2, x + 2, y + height - 2, 'ROOF', false))
    }
    this.sprite = this.createSprite(spriteInfo, contra.res.levelS[level.levelNumber], this.x, this.y);

    level.bgArray.push(this);
    if (this.platforms) {
      this.platforms.forEach((el) => { el.addToActual(level); });
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
      } */
}