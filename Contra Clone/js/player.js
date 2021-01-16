//import { Person, createSprite } from './person.js';

const playerSprites = [
  { name: 'stay', data: [1, 8, 22, 32, 1, 10, 0, 0] },
  { name: 'stayAndFire', data: [25, 8, 22, 33, 1, 10, 0, 0] },
  { name: 'stay_top', data: [49, 0, 14, 42, 1, 10, -4, 0] },
  { name: 'stay_topAndFire', data: [64, 0, 14, 42, 1, 10, -4, 0] },
  { name: 'lie', data: [78, 26, 33, 16, 1, 10, 0, 0] },
  { name: 'run', data: [0, 44, 22, 35, 6, 8, -2, 0] },
  { name: 'die', data: [0, 87, 34, 23, 10, 5, 0, 0] },
  { name: 'died', data: [307, 87, 32, 20, 2, 2, 0, 0] },
  { name: 'jump', data: [212, 1, 22, 22, 8, 2, -2, -9] },
  { name: 'run_Top', data: [3, 149, 22, 35, 3, 8, -3, 0] },
  { name: 'run_TopAndFire', data: [73, 149, 22, 35, 3, 8, -3, 0] },
  { name: 'run_Bottom', data: [2, 185, 23, 35, 3, 8, -1, 0] },
  { name: 'run_BottomAndFire', data: [71, 185, 23, 35, 3, 8, -1, 0] },
  { name: 'dip', data: [1, 242, 16, 15, 1, 8, -2, 0] },
  { name: 'dive', data: [17, 245, 18, 8, 2, 15, -2, 0] },
  { name: 'swim', data: [54, 238, 18, 15, 2, 15, -2, 0] },
  { name: 'swimAndFire', data: [91, 236, 27, 16, 2, 15, 1, 0] },
  { name: 'swim_top', data: [192, 225, 20, 27, 2, 15, -3, 0] },
  { name: 'swim_top_forward', data: [149, 234, 21, 18, 2, 15, -2, 0] },
  { name: 'fall', data: [89, 45, 20, 34, 1, 10, 0, 0] },
];

let path = `../src/sprites/player/player.png`;
let xCenter = 40;
let yBottom = 5;
let health = 1;


/*
let states = {
  stay: { sprite: createSprite(1, 8, 22, 32, 1, 10, path, xCenter, yBottom) },
  stayAndFire: { sprite: createSprite(25, 8, 24, 33, 1, 10, path, xCenter, yBottom) },
  stay_top: { sprite: createSprite(49, 0, 14, 42, 1, 10, path, xCenter, yBottom) },
  stay_topAndFire: { sprite: createSprite(64, 0, 14, 42, 1, 10, path, xCenter, yBottom) },
  lie: { sprite: createSprite(78, 26, 33, 16, 1, 10, path, xCenter, yBottom) },
  run: { sprite: createSprite(0, 44, 22, 35, 6, 8, path, xCenter, yBottom) },
  die: { sprite: createSprite(0, 87, 34, 23, 10, 5, path, xCenter, yBottom) },
  died: { sprite: createSprite(307, 87, 34, 23, 2, 2, path, xCenter, yBottom) },
  jump: { sprite: createSprite(212, 1, 22, 22, 8, 2, path, xCenter, yBottom) },
  run_Top: { sprite: createSprite(2, 149, 22, 35, 3, 8, path, xCenter, yBottom) },
  run_TopAndFire: { sprite: createSprite(72, 149, 22, 35, 3, 8, path, xCenter, yBottom) },
  run_Bottom: { sprite: createSprite(2, 185, 23, 35, 3, 8, path, xCenter, yBottom) },
  run_BottomAndFire: { sprite: createSprite(71, 185, 23, 35, 3, 8, path, xCenter, yBottom) },
  dip: { sprite: createSprite(1, 242, 16, 15, 1, 8, path, xCenter, yBottom) },
  dive: { sprite: createSprite(17, 245, 18, 8, 2, 15, path, xCenter, yBottom) },
  swim: { sprite: createSprite(54, 238, 18, 15, 2, 15, path, xCenter, yBottom) },
  swimAndFire: { sprite: createSprite(91, 236, 27, 16, 2, 15, path, xCenter, yBottom) },
  swim_top: { sprite: createSprite(192, 225, 20, 27, 2, 15, path, xCenter, yBottom) },
  swim_top_forward: { sprite: createSprite(149, 234, 22, 18, 2, 15, path, xCenter, yBottom) },
  fall: { sprite: createSprite(89, 45, 20, 34, 1, 10, path, xCenter, yBottom) },
};*/

class Player extends Person {
  constructor(name, game) {
    super(name, xCenter, yBottom, health, playerSprites, game, path);
    this.lifes = 2;
    this.assailable = false; // Уязвим ли

    this.selectState('jump');
  }
  startSwim() {
    this.pose = 'WATER';
    this.selectState('dip');
    this.needCalc = false;
    setTimeout(() => {
      this.selectState('swim');
      this.needCalc = true;
    }, 250);
  }

  endSwim(pjs, dx) {
    this.selectState('stay');
    this.spritesMesh.moveTime(pjs.vector.point(dx, -3), 200)
    this.needCalc = false;
    setTimeout(() => {
      this.needCalc = true;
    }, 200);
  }
}