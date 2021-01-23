/* eslint-disable import/no-cycle */
/* eslint-disable eol-last */
import Weapon from '../weapon/weapon';
import Person from '../person';
import contra from '../index';

const keys = [
  'tankR240',
  'tankR190',
  'tankR330',
  'tankR300',
  'tankR270',
  'tankR0',
  'tankR120',
  'tankR150',
  'tankR180',
  'tankR30',
  'tankR60',
  'tankR90',
  'tankRClose',
  'tankROpen',
];

export default class TankInRock extends Person {
  constructor(xCenter, yBottom, level) {
    super(xCenter, yBottom, 15, level.enemiesInfo, keys, contra.res.enemyS, level);
    this.weapon = new Weapon('D', this);
    this.selectState('tankR240');
    level.enemyArray.push(this);
  }
}