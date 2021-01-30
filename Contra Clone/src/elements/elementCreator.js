/* eslint-disable */

import Bridge from './bridge';
import BonusRock from './bonusRock';
import BonusFly from './bonusFly';
import EnemyCreator from '../enemy/enemyCreator';
import TankInRock from '../enemy/tankInRock';
import TankBottom from '../enemy/tankBottom';
import Sniper from '../enemy/sniper';
import Boss1 from '../boss/boss1';
// import Boss8 from '../boss/boss8';
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
        level.elementsArray.push(new Sniper(el.x, el.y, el.type, level));
        break;
      case 'bonusRock':
        new BonusRock(el.x, el.y, el.type, level);
        break;
      case 'bonusFly':
        new BonusFly(el.x, el.y, el.type, level);
        break;
      case 'enemyCreator':
        new EnemyCreator(el.type, el.coords, level);
        break;
      case 'boss1':
        new Boss1(el.x, el.y, level);
        break;
      default:
        break;
    }
  }
}