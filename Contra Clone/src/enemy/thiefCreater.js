/* eslint-disable */

import Thief from './thief';
import contra from '../index';


export default class ThiefCreater {
  constructor(type, level) {
    this.type = type; // STAY, HALF, STAYH
    this.reloading = 2000;
    level.elementsActual.push(this);
  }

  tryAction() {


  }

  die() {
    this.selectState('sniper180');
    this.spritesMesh.move(contra.pjs.vector.point(this.isFlip ? -0.5 : 0.5, -0.9));

  }
}