//import { Person, createSprite } from './person.js';

const playerSprites = [
  { name: 'stay', data: [1, 8, 22, 34, 1, 10, 0, 0] },
  { name: 'stayAndFire', data: [25, 9, 22, 33, 1, 10, 0, 0] },
  { name: 'stay_top', data: [49, 0, 14, 42, 1, 10, -4, 0] },
  { name: 'stay_topAndFire', data: [64, 0, 14, 42, 1, 10, -4, 0] },
  { name: 'lie', data: [78, 26, 33, 16, 1, 10, 0, 0] },
  { name: 'lieAndFire', data: [78, 26, 33, 16, 1, 10, 0, 1] },
  { name: 'run', data: [0, 44, 22, 35, 6, 8, -2, 0] },
  { name: 'runAndFire', data: [1, 110, 27, 34, 3, 8, 0, 0] },
  { name: 'die', data: [0, 87, 34, 23, 10, 5, 0, 0] },
  { name: 'died', data: [307, 87, 32, 20, 2, 2, 0, 0] },
  { name: 'jump', data: [212, 1, 22, 22, 8, 2, -2, -9] },
  { name: 'run_Top', data: [3, 149, 22, 35, 3, 8, -3, 0] },
  { name: 'run_TopAndFire', data: [73, 149, 22, 35, 3, 8, -3, 0] },
  { name: 'run_Bottom', data: [2, 185, 23, 35, 3, 8, -1, 0] },
  { name: 'run_BottomAndFire', data: [71, 185, 23, 35, 3, 8, -1, 0] },
  { name: 'dip', data: [1, 242, 16, 15, 1, 8, -2, 0] },
  { name: 'dive', data: [17, 245, 18, 8, 2, 15, -2, 0] },
  { name: 'swim', data: [54, 237, 18, 15, 2, 15, -2, 0] },
  { name: 'swimAndFire', data: [91, 235, 27, 16, 2, 15, 1, 0] },
  { name: 'swim_top', data: [192, 225, 20, 27, 2, 15, -3, 0] },
  { name: 'swim_top_forward', data: [149, 234, 21, 18, 2, 15, -2, 0] },
  { name: 'fall', data: [89, 45, 20, 34, 1, 10, 0, 0] },
];

let path = `../src/sprites/player/player.png`;
let xCenter = 40;
let yBottom = 5;
let health = 1;


class Player extends Person {
  constructor(name, game) {
    super(name, xCenter, yBottom, health, playerSprites, game, path);
    this.lifes = 2;
    this.assailable = false; // Уязвим ли

    this.selectState('jump');
    // this.states['runAndFire'].sprite.visible = true;
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

  endSwim(pjs, dx) {
    this.selectState('stay');
    this.pose = 'AIR';
    this.spritesMesh.move(pjs.vector.point(dx, -11))
    this.needCalc = false;
    setTimeout(() => {
      this.needCalc = true;
    }, 100);
  }

  shoot(buttons) {
    if (this.canShoot) {



      let shotStart = { x: 0, y: 0 };
      let shotVector = 0;
      let sprite = this.selectedState.sprite;

      switch (this.selectedState.name) {
        case 'jump':
        case 'fall':
          if (buttons[0]) {
            shotStart.y = sprite.y;
            if (buttons[1]) {
              shotStart.x = sprite.x + sprite.width;
              shotVector = 45;
            } else if (buttons[3]) {
              shotStart.x = sprite.x;
              shotVector = 135;
            } else {
              shotStart.x = sprite.x + sprite.width / 2;
              shotVector = 90;
            }
          } else if (buttons[2]) {
            shotStart.y = sprite.y + sprite.height;
            if (buttons[1]) {
              shotStart.x = sprite.x + sprite.width;
              shotVector = 315;
            } else if (buttons[3]) {
              shotStart.x = sprite.x + sprite.width;
              shotVector = 225;
            }
          } else {
            shotStart.y = sprite.y + sprite.height / 2;
            if (this.vectorMove === 1) {
              shotStart.x = sprite.x + sprite.width;
              shotVector = 0;
            } else {
              shotStart.x = sprite.x;
              shotVector = 180;
            }
          }
          break;
        case 'run':
          shotStart.y = sprite.y + sprite.height / 3;
          if (this.vectorMove === 1) {
            shotStart.x = sprite.x + sprite.width;
            shotVector = 0;
          } else {
            shotStart.x = sprite.x;
            shotVector = 180;
          }
          break;
        case 'run_Top':
          shotStart.y = sprite.y;
          if (this.vectorMove === 1) {
            shotStart.x = sprite.x + sprite.width;
            shotVector = 45;
          } else {
            shotStart.x = sprite.x;
            shotVector = 135;
          }
          break;
        case 'run_Bottom':
          shotStart.y = sprite.y + sprite.height * 0.66;
          if (this.vectorMove === 1) {
            shotStart.x = sprite.x + sprite.width;
            shotVector = 315;
          } else {
            shotStart.x = sprite.x;
            shotVector = 225;
          }
          break;
        case 'stay_top':
          shotStart.y = sprite.y;
          shotStart.x = sprite.x + sprite.width * 0.5;
          shotVector = 90;
          break;
        case 'lie':
          shotStart.y = sprite.y + sprite.height * 0.5;
          if (this.vectorMove === 1) {
            shotStart.x = sprite.x + sprite.width;
            shotVector = 0;
          } else {
            shotStart.x = sprite.x;
            shotVector = 180;
          }
          break;
        case 'swim':
          if (buttons[0]) {
            shotStart.y = sprite.y;
            this.selectState('swim_top_forward');
            if (buttons[1]) {
              shotStart.x = sprite.x + sprite.width;
              shotVector = 45;
            } else if (buttons[3]) {
              shotStart.x = sprite.x;
              shotVector = 135;
            } else {
              this.selectState('swim_top');
              shotStart.x = sprite.x + sprite.width / 2;
              shotVector = 90;
            }
          } else {
            this.selectState('swimAndFire');
            shotStart.y = sprite.y + sprite.height / 2;
            if (this.vectorMove === 1) {
              shotStart.x = sprite.x + sprite.width;
              shotVector = 0;
            } else {
              shotStart.x = sprite.x;
              shotVector = 180;
            }
          }
          break;
        default:
          shotStart = null;
          break;
      }



      if (this.selectedState.name !== 'jump' &&
        this.selectedState.name !== 'fall' &&
        this.selectedState.name !== 'swim') {
        this.selectState(`${this.selectedState.name}AndFire`);
      }


      if (shotStart) {
        this.weapon.shoot(this, shotStart, shotVector);

        this.dontShoot = false;
        setTimeout(() => {
          this.dontShoot = true;
        }, 250);
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