//import game from './index.js';

class Person {
  constructor(name, xCenter, yBottom, health, sprites, game, path) {
    this.name = name;
    this.xCenter = xCenter;
    this.yBottom = yBottom;
    this.weapon = new Weapon(name, 0);

    this.needCalc = true; // обновление координат и обработка кнопок;
    this.pose = 'AIR'; // air , platform , water
    this.vectorG = 1; // Направление силы притяжения. 1 - вниз. -1 - вверх

    this.states = {};
    this.vectorJump = 0; // -1 left, 1 right

    let spritesArr = [];
    sprites.forEach(element => {
      spritesArr.push(element.sprite);
      let sp = createSprite(...(element.data), path, xCenter, yBottom, game);
      this.states[element.name] = { name: element.name, sprite: sp };
      spritesArr.push(sp);
    });

    this.spritesMesh = game.newMesh({
      x: 35,
      y: 35,
      add: spritesArr
    });

    /*  0 stay 
        1 run
        2 jump
        3 lie
        4 fall   */

    this.action = 0;

    /* 0 1    Vectors. P - person
       P 2
       4 3  */

    this.vectorShoot = 2;
    this.vectorMove = 1;
    this.health = health;
    this.moveSpeed = 3;
    this.fallSpeed = 1.8;
  }

  selectState(stateName) {
    for (let key in this.states) {
      if (key === stateName) {
        this.states[key].sprite.visible = true;
        this.selectedState = this.states[key];
      } else {
        this.states[key].sprite.visible = false;
      }
    }
  }

  jump() {
    this.pose = 'AIR';
    this.vectorG = -1;
    this.selectState('jump');
    setTimeout(() => {
      this.vectorG = 1;
    }, 400);
  }
  jumpDown(buttomColArray) {
    console.log('jumpDown');
    console.log('buttomColArray', buttomColArray);
    if (buttomColArray.every((platform) => platform.canJumpDown)) {
      console.log('canJumpDown');
      this.pose = 'AIR';
      this.selectState('fall');
      this.spritesMesh.move(pjs.vector.point(0, 10));
    }
  }


  shoot() {
    this.weapon ? this.weapon.shoot(vectorMove, vectorShoot, x, y) : null;
  }

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
    contra.player.states['stay'].sprite.drawStaticBoxS(0, 28, 0, this.fallSpeed - 28);
    contra.player.states['stay'].sprite.drawStaticBoxA(-this.moveSpeed, 0, 0, 0);
    contra.player.states['stay'].sprite.drawStaticBoxD(this.moveSpeed, 0, 0, 0);
    //

    let buttomColArray = collisionSArray.filter(platform => platform.collision === 'BOTTOM');
    let waterColArray = buttomColArray.length > 0 ? [] : collisionSArray.filter(platform => platform.collision === 'WATER');

    switch (this.pose) {
      case 'AIR':
        if (this.vectorG === -1) {
          dy -= this.fallSpeed;
        } else {
          if (buttomColArray.length > 0) {
            dy = buttomColArray[0].sprite.y - (this.states['run'].sprite.y + this.states['run'].sprite.h);
            this.selectState('stay');
            this.pose = 'PLATFORM';
            // this.needCalc = false;
          } else if (waterColArray.length > 0) {
            console.log('air4');
            dy = waterColArray[0].sprite.y - (this.states['run'].sprite.y + this.states['run'].sprite.h);
            this.startSwim();
            return [0, 0];
          } else {
            console.log('air5');
            dy += this.fallSpeed;
          }
        }
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
          }
        }
        break;
      case 'WATER':
        if (collisionDArray.filter(platform => platform.collision === 'WATERLEFT').length === 1) {
          this.endSwim(pjs, 3);
          return [0, 0];
        } else if (collisionAArray.filter(platform => platform.collision === 'WATERRIGHT').length === 1) {
          this.endSwim(pjs, -3);
          return [0, 0];
        } else {

        }
        break;
      default:
        break;
    }



    /*
        if (buttons[1]) {
          dx += 1;
        }
        if (buttons[3]) {
          dx -= 1;
        }
        if (dx === 0) {

        } else {
          this.selectState('run');
          if (dx > 0) {
            if (this.vectorMove === -1) {
              for (let key in this.states) {
                this.states[key].sprite.setFlip(0, 0);
              }
              this.vectorMove = 1;
            }
          } else {
            if (this.vectorMove === 1) {
              for (let key in this.states) {
                this.states[key].sprite.setFlip(1, 0);
              }
              this.vectorMove = -1;
            }
          }
        }*/
    this.spritesMesh.move(pjs.vector.point(dx, dy));
    pjs.camera.move(pjs.vector.point(dx, 0));

    /*
    if (this instanceof Player) {

    }*/
  }

}

function createSprite(xS, yS, w, h, frames, delay, xCoef, yCoef, path, xCenter, yBottom, game) {
  return game.newAnimationObject({
    animation: tiles.newImage(path).getAnimation(xS, yS, w, h, frames),
    x: xCenter - w / 2 + xCoef,
    y: yBottom - h + yCoef,
    w: w,
    h: h,
    delay: delay
  });
}

//export { Person, createSprite };