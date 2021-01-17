//import game from './index.js';

class Person {
  constructor(name, xCenter, yBottom, health, sprites, game, path) {
    this.name = name;
    this.xCenter = xCenter;
    this.yBottom = yBottom;
    this.weapon = new Weapon(name, 0);

    this.needCalc = true; // обновление координат и обработка кнопок;
    this.pose = 'AIR'; // air , platform , water, death
    this.vectorJumpY = 1; // Направление силы притяжения. 1 - вниз. -1 - вверх
    this.vectorJumpX = 0; // -1 left, 1 right

    this.states = {};
    this.dontShoot = true; // flag to understand? am I shoot now

    let spritesArr = [];
    sprites.forEach(element => {
      spritesArr.push(element.sprite);
      let sp = this.createSprite(...(element.data), path, xCenter, yBottom, game);
      this.states[element.name] = { name: element.name, sprite: sp };
      spritesArr.push(sp);
    });

    this.spritesMesh = game.newMesh({
      x: 35,
      y: 35,
      add: spritesArr
    });

    this.vectorMove = 1;
    this.canShoot = true;

    this.health = health;
    this.moveSpeed = 3;
    this.fallSpeed = 1.8;
  }

  selectState(stateName) {
    if (this.dontShoot) {
      for (let key in this.states) {
        if (key === stateName) {
          this.states[key].sprite.visible = true;
          this.selectedState = this.states[key];
        } else {
          this.states[key].sprite.visible = false;
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
      this.spritesMesh.move(pjs.vector.point(0, 8));
    }
  }


  shoot() {}

  // buttons = [UP, Right, Bottom, Left,   Jump, Shot, SPACE]

  calculateMoves(contra, pjs, buttons) {
    let dx = 0;
    let dy = 0;
    let moveX = +buttons[1] - +buttons[3];

    if (this.vectorMove === -1 && moveX > 0) {
      for (let key in this.states) {
        this.states[key].sprite.setFlip(0, 0);
      }
      this.vectorMove = 1;
    } else if (this.vectorMove === 1 && moveX < 0) {
      for (let key in this.states) {
        this.states[key].sprite.setFlip(1, 0);
      }
      this.vectorMove = -1;
    }

    //contra.selectedLevel.pause(buttons[6]); // пауза. скорее всего будет осуществляться через лисенеры
    //this.needCalc = false;
    if (!this.needCalc) {
      return;
    }

    let collisionSArray = contra.selectedLevel.platformActual.filter(
      platform => platform.sprite.isStaticIntersect(this.states['run'].sprite.getStaticBoxS(0, 28, 0, this.fallSpeed - 28)));

    let collisionDArray = moveX > 0 ? contra.selectedLevel.platformActual.filter(
      platform => platform.sprite.isStaticIntersect(this.states['run'].sprite.getStaticBoxD(this.moveSpeed))) : [];

    let collisionAArray = moveX < 0 ? contra.selectedLevel.platformActual.filter(
      platform => platform.sprite.isStaticIntersect(this.states['run'].sprite.getStaticBoxA(-this.moveSpeed))) : [];

    // Разработка
    /*
		contra.player.states['stay'].sprite.drawStaticBoxS(0, 28, 0, this.fallSpeed - 28);
    contra.player.states['stay'].sprite.drawStaticBoxA(-this.moveSpeed, 0, 0, 0);
		contra.player.states['stay'].sprite.drawStaticBoxD(this.moveSpeed, 0, 0, 0);
		*/
    //

    let buttomColArray = collisionSArray.filter(platform => platform.collision === 'BOTTOM');
    let waterColArray = buttomColArray.length > 0 ? [] : collisionSArray.filter(platform => platform.collision === 'WATER');

    switch (this.pose) {
      case 'AIR':
        if (this.vectorJumpY < 0) {
          dy = this.fallSpeed * this.vectorJumpY;
        } else {
          if (buttomColArray.length > 0) {
            dy = buttomColArray[0].sprite.y - (this.states['run'].sprite.y + this.states['run'].sprite.h);
            this.selectState('stay');
            this.vectorJumpX = 0;
            this.pose = 'PLATFORM';
            // this.needCalc = false;	
          } else if (waterColArray.length > 0) {
            dy = waterColArray[0].sprite.y - (this.states['run'].sprite.y + this.states['run'].sprite.h);
            this.startSwim();
            return [0, 0];
          } else {
            dy = this.fallSpeed * this.vectorJumpY;
          }
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
        } else {
          if (buttons[4]) {
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
            } else {
              if (buttons[0]) {
                this.selectState('stay_top');
              } else if (buttons[2]) {
                this.selectState('lie');
              } else {
                this.selectState('stay');
              }
            }
          }
        }

        break;
      case 'WATER':
        if (collisionDArray.filter(platform => platform.collision === 'WATERLEFT').length === 1) {
          this.endSwim(pjs, 5);
          return [0, 0];
        } else if (collisionAArray.filter(platform => platform.collision === 'WATERRIGHT').length === 1) {
          this.endSwim(pjs, -5);
          return [0, 0];
        } else {
          if (buttons[2]) {
            this.selectState('dive');
            this.assailable = false;
          } else {
            this.selectState('swim');
            dx = moveX * this.moveSpeed;
            this.assailable = true;
          }
        }
        break;
      default:
        break;
    }

    if (buttons[5]) {
      this.shoot(buttons);
    }

    if (this.pose !== 'DEATH' && collisionSArray[0] && collisionSArray[0].collision === 'DEATH') {
      this.die();
    }


    let level = contra.selectedLevel;
    if (dx < 0 && level.leftBorder.sprite.isStaticIntersect(this.states['run'].sprite.getStaticBoxA(-this.moveSpeed))) {
      dx = 0;
    }
    this.spritesMesh.move(pjs.vector.point(dx, dy));
    if (dx > 0 && this.spritesMesh.x > pjs.camera.getPosition().x + 32 * 2) {
      pjs.camera.move(pjs.vector.point(dx, 0));
      level.deathPlatform.sprite.move(pjs.vector.point(dx, 0));
      level.leftBorder.sprite.move(pjs.vector.point(dx, 0));
      level.levelBorder.sprite.move(pjs.vector.point(dx, 0));
      contra.selectedLevel.tryRefreshActualElements();
    }
  }

  createSprite(xS, yS, w, h, frames, delay, xCoef, yCoef, path, xCenter, yBottom, game) {
    return game.newAnimationObject({
      animation: tiles.newImage(path).getAnimation(xS, yS, w, h, frames),
      x: xCenter - w / 2 + xCoef,
      y: yBottom - h + yCoef,
      w: w,
      h: h,
      delay: delay
    });
  }
}

//export { Person, createSprite };