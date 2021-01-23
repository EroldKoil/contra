/* eslint-disable */
import Bridge from './bridge';
import TankInRock from '../enemy/tankInRock';
import TankBottom from '../enemy/tankBottom';
export default class ElementCreator {
  constructor(el, level) {
    switch (el.name) {
      case 'bridge':
        new Bridge(el.blockCount, el.x, el.y, level);
        break;
      case 'tankInRock':
        new TankInRock(el.x, el.y, level);
        break;
      case 'tankBottom':
        new TankBottom(el.x, el.y, level);
        break;
      default:
        break;
    }
  }
}