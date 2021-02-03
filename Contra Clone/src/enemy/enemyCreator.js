import Thief from './thief';
import contra from '../index';

export default class EnemyCreator {
  constructor(type, coords, mode, level) {
    this.type = type; // STAY, HALF, STAYH
    this.coords = coords;
    this.level = level;
    this.canCreate = true;
    this.reloading = 2000;
    this.mode = mode;
  }

  tryAction() {
    if (this.canCreate && this.level.enemyArray.length < 10) {
      const camPos = contra.pjs.camera.getPosition().x;
      for (let i = 0; i < this.coords.length; i += 1) {
        const creator = this.coords[i];
        if (camPos > creator.xE) {
          this.coords.splice(i, 1);
          i -= 1;
          if (this.coords.length < 1) {
            this.die();
          }
        } else if (camPos > creator.xS) {
          const randY = creator.y - (Math.random() * (creator.y - 50));
          this.create(randY, creator.vector, this.reloading, camPos);
        }
      }
    }
  }

  create(y, vector, reloading, camPos) {
    this.canCreate = false;
    setTimeout(() => {
      this.canCreate = true;
    }, reloading);
    const x = vector > 0 ? camPos - 20 : camPos + 300;
    switch (this.type) {
      case 'thief':
        this.level.enemyArray.push(new Thief(x, y, vector, this.level, this, this.mpde));
        break;
      default:
        break;
    }
  }

  die() {
    this.level.elementsActual.splice(this.level.elementsActual.indexOf(this), 1);
  }
}