import { Person } from './person.js';
import Weapon from './weapon/weapon';
import pjs from './index';

const playerSprites = [
  { name: 'stay', data: [1, 8, 22, 34, 1, 10, 0, 0] },
  { name: 'stayAndFire', data: [25, 9, 22, 33, 1, 10, 0, 0] },
  { name: 'stay_top', data: [49, 0, 14, 42, 1, 10, -4, 0] },
  { name: 'stay_topAndFire', data: [64, 0, 14, 42, 1, 10, -4, 0] },
  { name: 'lie', data: [78, 26, 32, 16, 1, 10, 0, 0] },
  { name: 'lieAndFire', data: [78, 26, 32, 16, 1, 10, 0, 1] },
  { name: 'run', data: [0, 44, 22, 35, 6, 8, -2, 0] },
  { name: 'runAndFire', data: [1, 110, 27, 34, 3, 8, 0, 0] },
  { name: 'die', data: [0, 87, 34, 23, 10, 5, 0, 0] },
  { name: 'died', data: [307, 87, 32, 20, 2, 2, 0, 0] },
  { name: 'jump', data: [212, 1, 22, 22, 8, 2, -2, -9] },
  { name: 'run_Top', data: [3, 149, 22, 35, 3, 8, -3, 0] },
  { name: 'run_TopAndFire', data: [73, 149, 22, 35, 3, 8, -3, 0] },
  { name: 'run_Bottom', data: [3, 185, 22, 35, 3, 8, -1, 0] },
  { name: 'run_BottomAndFire', data: [71, 185, 22, 35, 3, 8, -1, 0] },
  { name: 'dip', data: [1, 242, 16, 15, 1, 8, -2, 0] },
  { name: 'dive', data: [17, 245, 18, 8, 2, 15, -2, 0] },
  { name: 'swim', data: [54, 237, 18, 15, 2, 15, -2, 0] },
  { name: 'swimAndFire', data: [91, 235, 27, 16, 2, 15, 1, 0] },
  { name: 'swim_top', data: [192, 225, 20, 27, 2, 15, -3, 0] },
  { name: 'swim_top_forward', data: [149, 234, 21, 18, 2, 15, -2, 0] },
  { name: 'fall', data: [89, 45, 20, 34, 1, 10, 0, 0] },
];

let path = './assets/sprites/player/player.png';
let xCenter = 40;
let yBottom = 5;
let health = 1;
export default class Player extends Person {
  constructor(name, level) {
    super(name, xCenter, yBottom, health, playerSprites, path);
    this.lifes = 2;
    this.assailable = false; // Уязвим ли
    this.level = level;
    this.weapon = new Weapon('L', this);
    this.selectState('jump');

  }

  startSwim() {
    this.pose = 'WATER';
    this.selectState('dip');
    this.needCalc = false;
    this.vectorJumpX = 0;
    setTimeout(() => {
      this.selectState('swim');
      this.needCalc = true;
    }, 250);
  }

  endSwim(dx) {
    this.selectState('stay');
    this.pose = 'AIR';
    this.spritesMesh.move(pjs.vector.point(dx, -11))
    this.needCalc = false;
    setTimeout(() => {
      this.needCalc = true;
    }, 100);
  }

  shoot(buttons) {
    if (this.canShoot && this.weapon.canShoot) {

      let shootCoord = { x: 0, y: 0 };
      let shotVector = 0;
      let sprite = this.selectedState.sprite;

      switch (this.selectedState.name) {
        case 'jump':
        case 'fall':
          if (buttons[0]) {
            shootCoord.y = sprite.y;
            if (buttons[1]) {
              shootCoord.x = sprite.x + sprite.w;
              shotVector = 45;
            } else if (buttons[3]) {
              shootCoord.x = sprite.x;
              shotVector = 135;
            } else {
              shootCoord.x = sprite.x + sprite.w / 2;
              shotVector = 90;
            }
          } else if (buttons[2]) {
            shootCoord.y = sprite.y + sprite.h;
            if (buttons[1]) {
              shootCoord.x = sprite.x + sprite.w;
              shotVector = 315;
            } else if (buttons[3]) {
              shootCoord.x = sprite.x + sprite.w;
              shotVector = 225;
            } else {
              shootCoord.x = sprite.x + sprite.w / 2;
              shotVector = 270;
            }
          } else {
            shootCoord.y = sprite.y + sprite.h / 2;
            if (this.vectorMove === 1) {
              shootCoord.x = sprite.x + sprite.w;
              shotVector = 0;
            } else {
              shootCoord.x = sprite.x;
              shotVector = 180;
            }
          }
          break;
        case 'run':
        case 'stay':
          shootCoord.y = sprite.y + sprite.h / 3.5;
          if (this.vectorMove === 1) {
            shootCoord.x = sprite.x + sprite.w;
            shotVector = 0;
          } else {
            shootCoord.x = sprite.x;
            shotVector = 180;
          }
          break;
        case 'run_Top':
          shootCoord.y = sprite.y;
          if (this.vectorMove === 1) {
            shootCoord.x = sprite.x + sprite.w - 5;
            shotVector = 45;
          } else {
            shootCoord.x = sprite.x - 2;
            shotVector = 135;
          }
          break;
        case 'run_Bottom':
          shootCoord.y = sprite.y + sprite.h * 0.5;
          if (this.vectorMove === 1) {
            shootCoord.x = sprite.x + sprite.w - 5;
            shotVector = 315;
          } else {
            shootCoord.x = sprite.x - 3;
            shotVector = 225;
          }
          break;
        case 'stay_top':
          shootCoord.y = sprite.y;
          if (this.vectorMove === 1) {
            shootCoord.x = sprite.x + sprite.w / 2;
          } else {
            shootCoord.x = sprite.x;
          }
          shotVector = 90;
          break;
        case 'lie':
          shootCoord.y = sprite.y + sprite.h * 0.3;
          if (this.vectorMove === 1) {
            shootCoord.x = sprite.x + sprite.w;
            shotVector = 0;
          } else {
            shootCoord.x = sprite.x;
            shotVector = 180;
          }
          break;
        case 'swim':
          if (buttons[0]) {
            shootCoord.y = sprite.y - 3;
            if (buttons[1]) {
              shootCoord.x = sprite.x + sprite.w - 2;
              shotVector = 45;
              this.selectState('swim_top_forward');
            } else if (buttons[3]) {
              shootCoord.x = sprite.x - 3;
              shotVector = 135;
              this.selectState('swim_top_forward');
            } else {
              this.selectState('swim_top');
              if (this.vectorMove === 1) {
                shootCoord.x = sprite.x + sprite.w / 2;
              } else {
                shootCoord.x = sprite.x;
              }
              shotVector = 90;
            }
          } else {
            this.selectState('swimAndFire');
            shootCoord.y = sprite.y + sprite.h / 2;
            if (this.vectorMove === 1) {
              shootCoord.x = sprite.x + sprite.w;
              shotVector = 0;
            } else {
              shootCoord.x = sprite.x;
              shotVector = 180;
            }
          }
          break;
        default:
          shootCoord = null;
          break;
      }

      if (this.selectedState.name !== 'jump' && this.selectedState.name !== 'fall' &&
        !this.selectedState.name.includes('swim') && !this.selectedState.name.includes('AndFire')) {
        this.selectState(`${this.selectedState.name}AndFire`);
      }

      if (shootCoord) {
        this.weapon.shoot(Math.PI / 180 * shotVector, shootCoord.x, shootCoord.y);

        this.dontShoot = false;
        setTimeout(() => {
          this.dontShoot = true;
        }, 200);
      }
    }
  }


  die() {
    this.selectState('die');
    this.pose = 'DEATH';
    this.needCalc = false;
    setTimeout(() => {
      this.selectState('died');
      setTimeout(() => {
        console.log('live');
        this.selectState('jump');
        this.spritesMesh.y = 40;
        this.pose = 'AIR';
        this.needCalc = true;
      }, 3000);
    }, 500);
  }
}