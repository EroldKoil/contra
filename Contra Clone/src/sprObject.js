import pjs from './index';
export default class SprObject {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  createSprite(spriteInfo, levelSprites, x, y) {
    /*console.log('3');
    console.log('spriteInfo', spriteInfo);*/
    return pjs.game.newAnimationObject({
      animation: levelSprites.getAnimation(spriteInfo.x, spriteInfo.y, spriteInfo.w / spriteInfo.frames, spriteInfo.h, spriteInfo.frames),
      x: x,
      y: y,
      w: spriteInfo.w / spriteInfo.frames,
      h: spriteInfo.h,
      delay: spriteInfo.delay ? spriteInfo.delay : 100,
    });
  }
}