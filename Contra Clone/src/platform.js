/* eslint-disable eol-last */
/* eslint-disable import/no-unresolved */
// collision - направление сталкивания : VERTICAL, LEFT, RIGHT
// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-cycle
import SprObject from './sprObject';

export default class Platform extends SprObject {
  constructor(w, h, x, y, collision, canJumpDown) {
    super(x, y, w, h);
    this.collision = collision;
    if (collision === 'BOTTOM') {
      this.canJumpDown = canJumpDown;
    }
    this.sprite = this.newRect(x, y, w, h);
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