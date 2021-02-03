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
import Boss6 from '../boss/boss6';
import Boss81 from '../boss/boss81';
import Boss82 from '../boss/boss82';
import Background from './background';

export default function elementCreator(el, level) {
  switch (el.name) {
    case 'bridge':
      level.elementsArray.push(new Bridge(el.blockCount, el.x, el.y, level));
      break;
    case 'tankInRock':
      level.elementsArray.push(new TankInRock(el.x, el.y, level));
      break;
    case 'tankBottom':
      level.elementsArray.push(new TankBottom(el.x, el.y, level));
      break;
    case 'sniper':
      level.elementsArray.push(new Sniper(el.x, el.y, el.type, level));
      break;
    case 'bonusRock':
      level.elementsArray.push(new BonusRock(el.x, el.y, el.type, level));
      break;
    case 'bonusFly':
      level.elementsArray.push(new BonusFly(el.x, el.y, el.type, level));
      break;
    case 'enemyCreator':
      level.elementsActual.push(new EnemyCreator(el.type, el.coords, el.mode, level));
      break;
    case 'toothyMouth':
      level.elementsArray.push(new ToothyMouth(el.x, el.y, level));
      break;
    case 'spiderCocoon':
      level.elementsArray.push(new SpiderCocoon(el.x, el.y, el.flip, level));
      break;
    case 'turel':
      level.elementsArray.push(new Turel(el.x, el.y, level));
      break;
    case 'flame':
      // eslint-disable-next-line max-len
      level.elementsArray.push(new Flame(el.x, el.y, el.length, el.type, el.delay, el.reloading, level));
      break;
    case 'boss1':
      level.elementsArray.push(new Boss1(el.x, el.y, level));
      break;
    case 'boss6':
      level.elementsArray.push(new Boss6(el.x, el.y, level));
      break;
    case 'boss81':
      level.elementsArray.push(new Boss81(el.x, el.y, level));
      break;
    case 'boss82':
      level.elementsArray.push(new Boss82(el.x, el.y, level));
      break;
    case 'background':
      level.elementsArray.push(new Background(el.img, el.platforms, el.paddons, level));
      break;
    default:
      break;
  }
}
