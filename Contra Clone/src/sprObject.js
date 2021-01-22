export default class sprObject {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  createSprite(spriteInfo, level, game, x, y) {
    return game.newAnimationObject({
      animation: level.levelSprites.getAnimation(
        spriteInfo.x, spriteInfo.y, this.width, this.height, spriteInfo.w / this.height,
      ),
      x,
      y,
      w: 32,
      h: 32,
      delay: spriteInfo.delay ? spriteInfo.delay : 100,
    });
  }
}
