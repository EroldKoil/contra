/* eslint-disable no-console */
/* eslint-disable eol-last */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/named */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import Person from './person.js';
import Weapon from './weapon/weapon';
import contra from './index';

/*
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
]; */

const playerSprites = {
  stay: {
    x: 1,
    y: 8,
    w: 22,
    h: 34,
    frames: 1,
    delay: 10,
    xCoef: 0,
    yCoef: 0,
  },
  stayAndFire: {
    x: 25,
    y: 9,
    w: 22,
    h: 33,
    frames: 1,
    delay: 10,
    xCoef: 0,
    yCoef: 0,
  },
  stay_top: {
    x: 49,
    y: 0,
    w: 14,
    h: 42,
    frames: 1,
    delay: 10,
    xCoef: -4,
    yCoef: 0,
  },
  stay_topAndFire: {
    x: 64,
    y: 0,
    w: 14,
    h: 42,
    frames: 1,
    delay: 10,
    xCoef: -4,
    yCoef: 0,
  },
  lie: {
    x: 78,
    y: 26,
    w: 32,
    h: 16,
    frames: 1,
    delay: 10,
    xCoef: 0,
    yCoef: 0,
  },
  lieAndFire: {
    x: 78,
    y: 26,
    w: 32,
    h: 16,
    frames: 1,
    delay: 10,
    xCoef: 0,
    yCoef: 1,
  },
  run: {
    x: 0,
    y: 44,
    w: 22,
    h: 35,
    frames: 6,
    delay: 8,
    xCoef: -2,
    yCoef: 0,
  },
  runAndFire: {
    x: 1,
    y: 110,
    w: 27,
    h: 34,
    frames: 3,
    delay: 8,
    xCoef: 0,
    yCoef: 0,
  },
  die: {
    x: 0,
    y: 87,
    w: 34,
    h: 23,
    frames: 10,
    delay: 5,
    xCoef: 0,
    yCoef: 0,
  },
  died: {
    x: 307,
    y: 87,
    w: 32,
    h: 20,
    frames: 2,
    delay: 2,
    xCoef: 0,
    yCoef: 0,
  },
  jump: {
    x: 212,
    y: 1,
    w: 22,
    h: 22,
    frames: 8,
    delay: 2,
    xCoef: -2,
    yCoef: -9,
  },
  run_Top: {
    x: 3,
    y: 149,
    w: 22,
    h: 35,
    frames: 3,
    delay: 8,
    xCoef: -3,
    yCoef: 0,
  },
  run_TopAndFire: {
    x: 73,
    y: 149,
    w: 22,
    h: 35,
    frames: 3,
    delay: 8,
    xCoef: -3,
    yCoef: 0,
  },
  run_Bottom: {
    x: 3,
    y: 185,
    w: 22,
    h: 35,
    frames: 3,
    delay: 8,
    xCoef: -1,
    yCoef: 0,
  },
  run_BottomAndFire: {
    x: 71,
    y: 185,
    w: 22,
    h: 35,
    frames: 3,
    delay: 8,
    xCoef: -1,
    yCoef: 0,
  },
  dip: {
    x: 1,
    y: 242,
    w: 16,
    h: 15,
    frames: 1,
    delay: 8,
    xCoef: -2,
    yCoef: 0,
  },
  dive: {
    x: 17,
    y: 245,
    w: 18,
    h: 8,
    frames: 2,
    delay: 15,
    xCoef: -2,
    yCoef: 0,
  },
  swim: {
    x: 54,
    y: 237,
    w: 18,
    h: 15,
    frames: 2,
    delay: 15,
    xCoef: -2,
    yCoef: 0,
  },
  swimAndFire: {
    x: 91,
    y: 235,
    w: 26,
    h: 16,
    frames: 2,
    delay: 15,
    xCoef: 1,
    yCoef: 0,
  },
  swim_top: {
    x: 192,
    y: 225,
    w: 20,
    h: 27,
    frames: 2,
    delay: 15,
    xCoef: -3,
    yCoef: 0,
  },
  swim_top_forward: {
    x: 148,
    y: 234,
    w: 20,
    h: 18,
    frames: 2,
    delay: 15,
    xCoef: -2,
    yCoef: 0,
  },
  fall: {
    x: 89,
    y: 45,
    w: 20,
    h: 34,
    frames: 1,
    delay: 10,
    xCoef: 0,
    yCoef: 0,
  },
};

const xCenter = 80;
const yBottom = 60;
const health = 1;

export default class Player extends Person {
  constructor(level) {
    super(xCenter, yBottom, health, playerSprites, Object.keys(playerSprites), contra.res.playerS, level);
    this.lifes = 2;
    this.assailable = false; // Уязвим ли
    this.weapon = new Weapon('L', this);
    this.needCalc = true; // обновление координат и обработка кнопок;
    this.pose = 'AIR'; // air , platform , water, death
    this.vectorJumpY = 1; // Направление силы притяжения. 1 - вниз. -1 - вверх
    this.vectorJumpX = 0; // -1 left, 1 right
    this.moveSpeed = 2;
    this.fallSpeed = 1.8;
    this.selectState('jump');
    this.medals = [];

    for (let i = 0; i < this.lifes; i += 1) {
      const medal = this.createSprite(contra.res.elementS, ...Object.values(level.elementsInfo.medal));
      this.medals.push(medal);
      medal.x = 10 + 10 * i;
      medal.y = 2;
    }

    this.center = contra.pjs.game.newRectObject({
      x: 0,
      y: 0,
      w: 5,
      h: 5,
    });
  }

  // buttons = [UP, Right, Bottom, Left,   Jump, Shot, SPACE]
  calculateMoves(buttons) {
    let dx = 0;
    let dy = 0;
    const moveX = +buttons[1] - +buttons[3];
    const p = contra.pjs.vector.point;

    if (this.vectorMove === -1 && moveX > 0) {
      for (const key in this.states) {
        this.states[key].sprite.setFlip(0, 0);
      }
      this.vectorMove = 1;
    } else if (this.vectorMove === 1 && moveX < 0) {
      for (const key in this.states) {
        this.states[key].sprite.setFlip(1, 0);
      }
      this.vectorMove = -1;
    }

    // contra.selectedLevel.pause(buttons[6]); // пауза. скорее всего будет осуществляться через лисенеры
    if (!this.needCalc) {
      return;
    }

    const collisionSArray = contra.selectedLevel.platformActual.filter(
      (platform) => platform.sprite.isStaticIntersect(this.states.run.sprite.getStaticBoxS(0, 28, 0, this.fallSpeed - 28)),
    );

    const collisionDArray = moveX > 0 ? contra.selectedLevel.platformActual.filter(
      (platform) => platform.sprite.isStaticIntersect(this.states.run.sprite.getStaticBoxD(this.moveSpeed)),
    ) : [];

    const collisionAArray = moveX < 0 ? contra.selectedLevel.platformActual.filter(
      (platform) => platform.sprite.isStaticIntersect(this.states.run.sprite.getStaticBoxA(-this.moveSpeed)),
    ) : [];

    const buttomColArray = collisionSArray.filter((platform) => platform.collision === 'BOTTOM');
    const waterColArray = buttomColArray.length > 0 ? [] : collisionSArray.filter((platform) => platform.collision === 'WATER');

    switch (this.pose) {
      case 'AIR':
        if (this.vectorJumpY < 0) {
          dy = this.fallSpeed * this.vectorJumpY;
        } else if (buttomColArray.length > 0) {
          dy = buttomColArray[0].sprite.y - (this.states.run.sprite.y + this.states.run.sprite.h);
          this.selectState('stay');
          this.vectorJumpX = 0;
          this.pose = 'PLATFORM';
          // this.needCalc = false;
        } else if (waterColArray.length > 0) {
          dy = waterColArray[0].sprite.y - (this.states.run.sprite.y + this.states.run.sprite.h);
          this.startSwim();
          return;
        } else {
          dy = this.fallSpeed * this.vectorJumpY;
        }

        if (moveX !== 0) {
          this.vectorJumpX = moveX;
        }
        dx = this.vectorJumpX * this.moveSpeed;

        break;
      case 'PLATFORM':
        if (buttomColArray.length === 0) {
          dy -= this.fallSpeed;
          this.selectState('fall');
          this.pose = 'AIR';
        } else if (buttons[4]) {
          this.vectorJumpX = 0;
          if (buttons[2]) {
            this.jumpDown(buttomColArray);
          } else {
            this.jump();
          }
        } else {
          dx = moveX * this.moveSpeed;
          if (dx !== 0) {
            if (buttons[0]) {
              this.selectState('run_Top');
            } else if (buttons[2]) {
              this.selectState('run_Bottom');
            } else {
              this.selectState('run');
            }
          } else if (buttons[0]) {
            this.vectorJumpX = 0;
            this.selectState('stay_top');
          } else if (buttons[2]) {
            this.selectState('lie');
          } else {
            this.selectState('stay');
          }
        }

        break;
      case 'WATER':
        if (collisionDArray.filter((platform) => platform.collision === 'WATERLEFT').length === 1) {
          this.endSwim(5);
          return;
        }
        if (collisionAArray.filter((platform) => platform.collision === 'WATERRIGHT').length === 1) {
          this.endSwim(-5);
          return;
        }
        if (buttons[2]) {
          this.selectState('dive');
          this.assailable = false;
        } else {
          this.selectState('swim');
          dx = moveX * this.moveSpeed;
          this.assailable = true;
        }

        break;
      default:
        break;
    }

    if (buttons[5] && this.selectedState.name !== 'dive' && this.selectedState.name !== 'dip') {
      this.shoot(buttons);
    }

    if (this.pose !== 'DEATH' && collisionSArray[0] && collisionSArray[0].collision === 'DEATH') {
      this.die();
    }

    const level = contra.selectedLevel;
    if (dx < 0 && level.leftBorder.sprite.isStaticIntersect(this.states.run.sprite.getStaticBoxA(-this.moveSpeed))) {
      dx = 0;
    }

    this.spritesMesh.move(p(dx, dy));
    if (dx > 0 && this.spritesMesh.x > contra.pjs.camera.getPosition().x + 32 * 4) {
      this.medals.forEach((el) => { el.x += dx; });
      contra.pjs.camera.move(p(dx, 0));
      level.deathPlatform.sprite.move(p(dx, 0));
      level.leftBorder.sprite.move(p(dx, 0));
      level.levelBorder.sprite.move(p(dx, 0));
      contra.selectedLevel.tryRefreshActualElements();
    }
    this.medals.forEach((el) => { el.draw(); });
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
    this.spritesMesh.move(contra.pjs.vector.point(dx, -11));
    this.needCalc = false;
    setTimeout(() => {
      this.needCalc = true;
    }, 100);
  }

  shoot(buttons) {
    if (this.canShoot && this.weapon.canShoot) {
      let shootCoord = { x: 0, y: 0 };
      let shotVector = 0;
      const { sprite } = this.selectedState;

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
        this.weapon.shoot((Math.PI / 180) * shotVector, shootCoord.x, shootCoord.y);

        this.dontShoot = false;
        setTimeout(() => {
          this.dontShoot = true;
        }, 300);
      }
    }
  }

  jump() {
    this.pose = 'AIR';
    this.vectorJumpY = -1;
    this.selectState('jump');
    setTimeout(() => {
      if (this.vectorJumpY !== 1) {
        this.vectorJumpY = -0.1;
        setTimeout(() => {
          if (this.vectorJumpY !== 1) {
            this.vectorJumpY = 0.1;
            setTimeout(() => {
              this.vectorJumpY = 1;
            }, 50);
          }
        }, 50);
      }
    }, 450);
  }

  jumpDown(buttomColArray) {
    if (buttomColArray.every((platform) => platform.canJumpDown)) {
      this.pose = 'AIR';
      this.selectState('fall');
      this.spritesMesh.move(contra.pjs.vector.point(0, 8));
    }
  }

  selectState(stateName) {
    if (this.dontShoot || stateName === 'jump' || stateName === 'fall' || stateName === 'swim_top_forward' || stateName === 'swim_top' || stateName === 'dip') {
      for (const key in this.states) {
        if (key === stateName) {
          this.states[key].sprite.visible = true;
          this.selectedState = this.states[key];
        } else {
          this.states[key].sprite.visible = false;
        }
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

  setAssailable(time) {
    this.assailable = false;
    setTimeout(() => {
      this.assailable = true;
    }, time);
  }
}