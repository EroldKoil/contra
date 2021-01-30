/* eslint-disable*/

import Person from './person';
import Weapon from './weapon/weapon';
import contra from './index';
import Sound from './sound';

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
    x: 2,
    y: 110,
    w: 26,
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
    this.lifes = 10;
    this.assailable = false; // Уязвим ли
    this.weapon = new Weapon('S', this);
    this.needCalc = true; // обновление координат и обработка кнопок;
    this.pose = 'AIR'; // air , platform , water, death
    this.vectorJumpY = 1; // Направление силы притяжения. 1 - вниз. -1 - вверх
    this.vectorJumpX = 0; // -1 left, 1 right
    this.moveSpeed = 3;
    this.fallSpeed = 1.8;
    this.timeAfterShoot = 0;
    this.timeForAnimationShot = 15;
    this.vectorMove = 1;
    this.canShoot = true;

    this.selectState('jump');

    this.medal = this.createSprite(contra.res.elementS, ...Object.values(level.elementsInfo.medal));
    this.medal.y = 2;
    this.reBurn();
  }

  // buttons = [UP, Right, Bottom, Left,   Jump, Shot]
  calculateMoves(buttons) {
    if (this.health < 1) {
      buttons = [false, false, false, false, false, false]
    }
    const camPos = contra.pjs.camera.getPosition().x;
    this.timeAfterShoot += 1;
    let dx = 0;
    let dy = 0;
    const moveX = +buttons[1] - +buttons[3];
    const p = contra.pjs.vector.point;

    if (this.vectorMove === -1 && moveX > 0) {
      this.flip(0, 0);
      this.vectorMove = 1;
    } else if (this.vectorMove === 1 && moveX < 0) {
      this.flip(1, 0);
      this.vectorMove = -1;
    }

    // this.medals.forEach((el) => { el.draw(); });

    for (let i = 0; i < this.lifes; i += 1) {
      this.medal.x = camPos + 10 + 10 * i;
      this.medal.draw();
    }

    if (!this.needCalc) {
      console.log('ret');
      return;
    }

    const collisionSArray = contra.selectedLevel.platformActual.filter(
      (platform) => platform.sprite.isStaticIntersect(this.states.run.sprite.getStaticBoxS(2, 28, -4, this.fallSpeed - 28)),
    );

    const collisionDArray = contra.selectedLevel.platformActual.filter(
      (platform) => platform.sprite.isStaticIntersect(this.selectedState.sprite.getStaticBoxD(4, 0, -8 + this.moveSpeed)),
    );

    const collisionAArray = contra.selectedLevel.platformActual.filter(
      (platform) => platform.sprite.isStaticIntersect(this.selectedState.sprite.getStaticBoxA(4 - this.moveSpeed, 0, -8)),
    );

    //this.selectedState.sprite.drawStaticBoxA(4, 0, -8)
    //this.selectedState.sprite.drawStaticBoxA(4 - this.moveSpeed, 0, -8)

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
          Sound.play('stomp');
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
              if (this.selectedState.name !== 'runAndFire' || this.timeAfterShoot > this.timeForAnimationShot) {
                this.selectState('run');
              }
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
          if (this.timeAfterShoot > this.timeForAnimationShot) {
            this.selectState('swim');
          }
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

    if (this.health > 0) {
      if (collisionSArray[0] && collisionSArray[0].collision === 'DEATH') {
        this.die();
      } else if (this.assailable) {
        this.checkColission();
      }
    }



    /*
			if (dx < 0 && this.level.leftBorder.sprite.isStaticIntersect(this.states.run.sprite.getStaticBoxA(4 - this.moveSpeed, 0, -8))) {
				dx = 0;
			}*/



    if (dx !== 0) {
      const array = dx > 0 ? collisionDArray : collisionAArray;
      const collV = array.filter((platform) => platform.collision === 'VERTICAL');
      if (collV.length > 0) {
        const spr = this.selectedState.sprite;
        dx = dx > 0 ? (collV[0].x - (spr.x + spr.w) + 4) : (collV[0].x + collV[0].w - spr.x + 4);
      }
    }

    if (this.health < 1 && this.selectedState.sprite.y + this.selectedState.sprite.h > 222) {
      dy = 0;
    }

    this.spritesMesh.move(p(dx, dy));
    this.spritesMesh.draw();

    if (dx > 0 && this.spritesMesh.x > camPos + 32 * 4 && camPos <= contra.selectedLevel.length && this.level.canMoveCamera) {
      contra.selectedLevel.moveCamera(dx);
    }
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
      const { sprite, name } = this.selectedState;

      switch (name) {
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

      if (name !== 'jump' && name !== 'fall' &&
        !name.includes('swim') && !name.includes('AndFire')) {
        this.selectState(`${name}AndFire`);
      }

      if (shootCoord) {
        this.weapon.shoot((Math.PI / 180) * shotVector, shootCoord.x, shootCoord.y);
        if (this.pose !== 'AIR') {
          this.timeAfterShoot = 0;
        }
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

  checkColission() {
    const dengerousEnemy = contra.selectedLevel.enemyArray.filter((enemy) => enemy.touchDemage && enemy.health > 0);
    [...dengerousEnemy, ...this.level.bulletsArray].forEach(el => {
      if (this.health > 0 && this.selectedState.sprite.isStaticIntersect(el.getBox())) {
        this.die();
      }
    });
  }

  selectState(stateName, forDeath) {
    if (this.health > 0 || forDeath) {
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
    console.log('die');
    this.selectState('die', true);
    this.health = 0;
    this.lifes -= 1;
    this.weapon.changeWeapon('D');
    //this.level.onKeyboard();
    setTimeout(() => {
      this.selectState('died', true);
      if (this.lifes > 0) {
        setTimeout(() => {
          this.reBurn();
        }, 1000);
      } else {
        console.log('game Over');
      }
    }, 500);
  }

  reBurn() {
    console.log('reBurn');
    this.selectState('jump');
    this.pose = 'AIR';
    this.spritesMesh.y = 10;
    this.spritesMesh.x = contra.pjs.camera.getPosition().x + 40;
    // this.level.onKeyboard();
    this.setAssailable(4000);
    setTimeout(() => {
      this.health = 1;
    }, 100);
  }

  setAssailable(time) {
    this.assailable = false;
    let visibility = true;
    const interval = setInterval(() => {
      this.selectedState.sprite.setAlpha(visibility ? 0.5 : 1);
      visibility = !visibility;
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      this.assailable = true;
      for (const key in this.states) {
        this.states[key].sprite.setAlpha(1);
      }
    }, 100000); // time
  }
}