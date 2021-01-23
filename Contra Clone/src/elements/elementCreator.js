/* eslint-disable import/no-cycle */
/* eslint-disable no-new */
import Bridge from './bridge';
import TankInRock from '../enemy/tankInRock';

export default class ElementCreator {
  constructor(el, level) {
    switch (el.name) {
      case 'bridge':
        new Bridge(el.blockCount, el.x, el.y, level);
        break;
      case 'tankInRock':
        new TankInRock(el.x, el.y, level);
        break;
      default:
        break;
    }
  }
}