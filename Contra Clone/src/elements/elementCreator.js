/* eslint-disable */

import Bridge from './bridge';
import BonusRock from './bonusRock';
import BonusFly from './bonusFly';
import EnemyCreator from '../enemy/enemyCreator';
import TankInRock from '../enemy/tankInRock';
import TankBottom from '../enemy/tankBottom';
import Sniper from '../enemy/sniper';
import ToothyMouth from '../enemy/toothyMouth';
import SpiderCocoon from '../enemy/spiderCocoon';
import Turel from '../enemy/turel';
import Flame from '../enemy/flame';
import Boss1 from '../boss/boss1';
import Boss81 from '../boss/boss81';
import Boss82 from '../boss/boss82';
import Background from './background';

export default function elementCreator(el, level) {
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
    case 'toothyMouth':
      new ToothyMouth(el.x, el.y, level);
      break;
    case 'spiderCocoon':
      new SpiderCocoon(el.x, el.y, el.flip, level);
      break;
    case 'turel':
      new Turel(el.x, el.y, level);
      break;
    case 'flame':
      new Flame(el.x, el.y, el.length, el.type, el.delay, el.reloading, level);
      break;
    case 'boss1':
      new Boss1(el.x, el.y, level);
      break;
    case 'boss81':
      new Boss81(el.x, el.y, level);
      break;
    case 'boss82':
      new Boss82(el.x, el.y, level);
      break;
    case 'background':
      new Background(el.img, el.platforms, el.paddons, level);
      break;
    default:
      break;
  }
}