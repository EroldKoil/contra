class Bridge extends sprObject {
  constructor(blockCount, x, y, level, game) {
    super(x, y, 32, 32);


    console.log(this.x);
    this.sprites = [this.createSprite(level.spritesInfo['b1'], level, game, this.x, this.y)];
    for (let i = 0; i < blockCount - 2; i++) {
      this.sprites.push(this.createSprite(level.spritesInfo['b2'], level, game, this.x + 32 * (i + 1), this.y));
    }
    this.sprites.push(this.createSprite(level.spritesInfo['b3'], level, game, this.x + 32 * (blockCount - 1), this.y));

    level.elementsArray.push(this);

  }
}