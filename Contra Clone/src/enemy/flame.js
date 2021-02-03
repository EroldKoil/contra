import contra from '../index';
import Sound from '../sound';

const horizontalKeys = [
  'flameH0',
  'flameH1',
  'flameH2',
  'flameH3',
  'flameH4',
  'flameH5',
  'flameH6',
  'flameH7',
  'flameH8',
  'flameH9',
  'flameH10',
  'flameH11',
];

const verticalalKeys = [
  'flameV0',
  'flameV1',
  'flameV2',
  'flameV3',
  'flameV4',
  'flameV5',
  'flameV6',
  'flameV7',
  'flameV8',
  'flameV9',
  'flameV10',
  'flameV11',
];

export default class Flame {
  constructor(x, y, length, type, delay, reloading, level) {
    const keys = (type === 'RIGHT' || type === 'LEFT') ? horizontalKeys : verticalalKeys;
    this.health = 1;
    this.level = level;
    this.x = x;
    this.y = y;
    this.xCoef = 0;
    this.yCoef = 0;
    this.length = length;
    this.touchDemage = true;
    this.states = {};
    this.canAction = false;
    this.delay = delay;
    this.reloading = reloading;
    this.type = type;

    this.nullFrame = contra.pjs.game.newRectObject({
      x: -1,
      y: -1,
      w: 1,
      h: 1,
    });

    switch (type) {
      case 'RIGHT':
        this.xCoef = 8;
        this.x -= 24;
        break;
      case 'BOTTOM':
        this.yCoef = 8;
        this.y -= 24;
        break;
      default:
        break;
    }

    let i = -1;
    const spritesArr = [];
    keys.forEach((key) => {
      const sp = this.createSprite(
        contra.res.boss, i, type, ...Object.values(level.elementsInfo[key]),
      );
      this.states[key] = { name: key, sprite: sp };
      spritesArr.push(sp);
      i += 1;
    });

    this.spritesMesh = contra.pjs.game.newMesh({
      x,
      y,
      add: spritesArr,
    });

    switch (type) {
      case 'RIGHT':
        spritesArr[0].move(contra.pjs.vector.point(160, 0));
        this.spritesMesh.move(contra.pjs.vector.point(-32, -6));
        break;
      case 'BOTTOM':
        spritesArr[0].y += 8;
        this.flip(0, 1);
        break;
      case 'LEFT':
        this.flip(1, 0);
        break;
      default:
        break;
    }

    this.noramlState = this.states[Object.keys(this.states)[0]];
    this.selectState(0);
  }

  tryAction() {
    this.spritesMesh.draw();
    // this.selectedState.sprite.drawStaticBox();
    const camPos = contra.pjs.camera.getPosition().x;
    this.tryRemove(false, camPos);
    if (this.canAction && !(this.x < camPos + 20 && this.type !== 'LEFT')) {
      Sound.play('fireBeam');
      let i = 0;
      let isReturn = false;
      this.canAction = false;
      setTimeout(() => {
        this.canAction = true;
      }, this.reloading);
      const interval = setInterval(() => {
        if (i === this.length) {
          isReturn = true;
        }
        if (i < this.length) {
          this.selectState(i);
        }
        i = isReturn ? i - 1 : i + 1;
        if (isReturn && i === -1) {
          clearInterval(interval);
        }
      }, 60);
    }
  }

  createSprite(image, i, type, xS, yS, w, h, frames = 1, delay = 100) {
    return contra.pjs.game.newAnimationObject({
      animation: image.getAnimation(xS, yS, w, h, frames),
      x: i === -1 && type === 'RIGHT' ? 24 : -this.xCoef * i,
      y: i === -1 && type === 'RIGHT' ? 0 : -this.yCoef * i,
      w,
      h,
      delay,
    });
  }

  isTimeToShow(camPos) {
    if (camPos > this.x - 256 - 16) {
      this.level.enemyArray.push(this);
      this.level.elementsArray.splice(this.level.elementsArray.indexOf(this), 1);
      setTimeout(() => {
        this.canAction = true;
      }, this.delay);
    }
  }

  selectState(n) {
    let i = 0;
    Object.keys(this.states).forEach((key) => {
      if (i === n) {
        this.states[key].sprite.visible = true;
        this.selectedState = this.states[key];
      } else {
        this.states[key].sprite.visible = false;
      }
      i += 1;
    });
  }

  flip(x, y) {
    Object.keys(this.states).forEach((key) => {
      this.states[key].sprite.setFlip(x, y);
    });
  }

  getBox() {
    let resp;
    if (this.selectedState === this.noramlState) {
      resp = this.nullFrame;
    } else {
      resp = this.selectedState.sprite;
    }
    return resp;
  }

  tryRemove(die, camPos) {
    if (die || camPos > this.x + 50) {
      this.level.enemyArray.splice(this.level.enemyArray.indexOf(this), 1);
    }
  }
}
