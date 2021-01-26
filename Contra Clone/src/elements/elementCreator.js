/* eslint-disable */

import Bridge from './bridge';
import BonusRock from './bonusRock';
import BonusFly from './bonusFly';
import TankInRock from '../enemy/tankInRock';
import TankBottom from '../enemy/tankBottom';
import Sniper from '../enemy/sniper';
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
      case 'sniper':
        new Sniper(el.x, el.y, el.type, level);
        break;
      case 'bonusRock':
        new BonusRock(el.x, el.y, el.type, level);
        break;
      case 'bonusFly':
        new BonusFly(el.x, el.y, el.xFly, el.type, level);
        break;
      default:
        break;
    }
  }
}