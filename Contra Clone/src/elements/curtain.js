/* eslint-disable */

import contra from '../index';

export default class Curtain {
  constructor(array) {
    this.array = array;
    this.sprite = contra.pjs.game.newRectObject({
      x: -15,
      y: -5,
      w: 300,
      h: 250,
      fillColor: "#000000",
    });
  }

  tryAction() {
    this.sprite.move(contra.pjs.vector.point(7, 0));
    this.sprite.draw();
    if (this.sprite.x > 350) {
      this.array.splice(this.array.indexOf(this), 1);
    }
  }
}
