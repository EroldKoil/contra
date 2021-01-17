// collision - направление сталкивания : VERTICAL, LEFT, RIGHT
//import { contra, game } from './index.js';
import sprObject from './sprObject';

export default class Platform extends sprObject {
  constructor(width, height, x, y, collision, canJumpDown, pjs) {
    super(x, y, width, height);
    this.collision = collision;
    if (collision === 'BOTTOM') {
      this.canJumpDown = canJumpDown;
    }
    this.sprite = pjs.game.newImageObject({
      file: './assets/sprites/platform.png',
      x: x,
      y: y,
      w: width,
      h: height,
    });
  }

  moveX(dx) {
    this.sprite.x += dx;
  }

  moveY(dy) {
    this.sprite.y += dy;
  }

  addToActual(level) {
    level.platformActual.push(this);
  }
}
