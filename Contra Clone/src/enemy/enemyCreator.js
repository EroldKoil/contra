/* eslint-disable */

import Thief from './thief';
import contra from '../index';
export default class EnemyCreator {
  constructor(type, coords, level) {
    this.type = type; // STAY, HALF, STAYH
    this.coords = coords;
    this.level = level;
    this.canCreate = true;
    this.reloading = 2000;
    level.elementsActual.push(this);
  }

  tryAction() {
    if (this.canCreate) {
      const camPos = contra.pjs.camera.getPosition().x;
      for (let i = 0; i < this.coords.length; i++) {
        const creator = this.coords[i];
        if (camPos > creator.xE) {
          this.coords.splice(i, 1);
          i--;
          if (this.coords.length < 1) {
            this.die();
          }
        } else if (camPos > creator.xS) {
          const randY = creator.y - (Math.random() * (creator.y - 50));
          const reloadRand = (Math.random() * 4000) + 500;
          this.create(randY, creator.vector, reloadRand, camPos);
        }
      }
    }
  }

  create(y, vector, reloading, camPos) {
    this.canCreate = false;
    setTimeout(() => {
      this.canCreate = true;
    }, reloading);
    console.log('add thief');
    switch (this.type) {
      case 'thief':
        let x = vector > 0 ? camPos - 20 : camPos + 300;
        new Thief(x, y, vector, this.level);
        break;
      default:
        break;
    }
  }

  die() {
    console.log('creator End');
    this.level.elementsActual.splice(this.level.elementsActual.indexOf(this), 1);
  }
}