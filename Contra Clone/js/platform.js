// collision - направление сталкивания : VERTICAL, LEFT, RIGHT
//import { contra, game } from './index.js';

class Platform extends sprObject {
  constructor(width, height, x, y, collision, canJumpDown) {
    super(x, y, width, height);
    this.collision = collision;
    if (collision === 'BOTTOM') {
      this.canJumpDown = canJumpDown;
    }
    this.sprite = game.newImageObject({
      file: `../src/sprites/platform.png`,
      x: x,
      y: y,
      w: width,
      h: height,
    });
  }

  moveX(dx) {
    this.sprite.x += dx;
  }

  moveX(dy) {
    this.sprite.y += dy;
  }

  addToActual(level) {
    level.platformActual.push(this);
  }
}