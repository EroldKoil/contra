/* eslint-disable */

import contra from './index';

export default class SprObject {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  createSprite(spriteInfo, sprites, x, y) {
    return contra.pjs.game.newAnimationObject({
      animation: sprites.getAnimation(
        spriteInfo.x,
        spriteInfo.y,
        spriteInfo.w,
        spriteInfo.h || 32,
        spriteInfo.frames || 1,
      ),
      x,
      y,
      w: spriteInfo.w,
      h: spriteInfo.h || 32,
      delay: spriteInfo.delay ? spriteInfo.delay : 100,
    });
  }

  newRect(x, y, w, h) {
    return contra.pjs.game.newRectObject({ x, y, w, h });
  }
}