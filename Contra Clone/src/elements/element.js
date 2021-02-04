import SprObject from '../sprObject';

export default class Element extends SprObject {
  constructor(x, y, w, h, level) {
    super(x, y, w, h);
    this.level = level;
  }

  isTimeToShow(camPos) {
    if (camPos > this.x - 260) {
      this.level.elementsActual.push(this);
      this.level.elementsArray.splice(this.level.elementsArray.indexOf(this), 1);
    }
  }
}
