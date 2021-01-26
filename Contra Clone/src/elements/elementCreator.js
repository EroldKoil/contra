/* eslint-disable */

import Bridge from './bridge';
import BonusRock from './bonusRock';
import EnemyCreator from '../enemy/enemyCreator';
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
      case 'enemyCreator':
        new EnemyCreator(el.type, el.coords, level);
        break;
      default:
        break;
    }
  }
}