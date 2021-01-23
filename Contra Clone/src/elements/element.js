/* eslint-disable eol-last */
/* eslint-disable import/no-cycle */
import SprObject from '../sprObject';
import contra from '../index';

export default class Element extends SprObject {
  constructor(x, y, w, h, level) {
    super(x, y, w, h);
    this.level = level;
  }

  isTimeToShow() {
    if (contra.pjs.camera.getPosition().x > this.x - 260) {
      this.level.elementsActual.push(this);
      this.level.elementsArray.splice(this.level.elementsArray.indexOf(this), 1);
    }
  }
}