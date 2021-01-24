/* eslint-disable */

import Element from './element';
import Platform from '../platform';
import contra from '../index';

export default class Сurtain {
  constructor(array) {
    this.array = array;
    this.sprite = contra.pjs.game.newRectObject({
      x: -5,
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