import contra from '../index';

function createSprite(image, xS, yS, w, h, frames = 1, delay = 100, xCoef = 0, yCoef = 0) {
  return contra.pjs.game.newAnimationObject({
    animation: image.getAnimation(xS, yS, w, h, frames),
    x: xCoef,
    y: yCoef,
    w,
    h,
    delay,
  });
}

export default class BossBullet {
  constructor(arrFrom, arrTo, level) {
    this.arrFrom = arrFrom;
    this.arrTo = arrTo;
    const image = contra.res.elementS;

    this.spritesArr = [
      createSprite(image, ...Object.values(level.elementsInfo.shootM1)),
      createSprite(image, ...Object.values(level.elementsInfo.mediumBoom), -3, -10),
    ];
    this.shadow = createSprite(image, ...Object.values(level.elementsInfo.shadow));

    this.spritesArr[0].visible = false;
    this.spritesArr[1].visible = false;
    this.selectedState = -1;

    this.spritesMesh = contra.pjs.game.newMesh({
      x: 0,
      y: 0,
      add: this.spritesArr,
    });

    this.vector = [-2, -2];
    this.timeForFly = 0;
  }

  shoot(x, y) {
    this.spritesMesh.setPosition(contra.pjs.vector.point(x - 8, y));
    this.timeForFly = Math.random() * 200;
    this.spritesArr[0].visible = true;
    this.spritesArr[1].visible = false;
    this.selectedState = 0;
    this.vector = [-1, -2];
    this.vector[0] = Math.random() * -1.5 - 0.5;

    setTimeout(() => {
      this.vector[1] = -1;
      setTimeout(() => {
        this.vector[1] = 1;
        setTimeout(() => {
          this.vector[1] = 2;
        }, 100);
      }, 100);
    }, this.timeForFly);
  }

  draw() {
    const spr = this.spritesArr[this.selectedState];
    this.drawShadow();
    spr.draw();
    if (this.selectedState === 0) {
      if (contra.player.assailable &&
        spr.isStaticIntersect(contra.player.selectedState.sprite.getStaticBox())) {
        this.die();
        contra.player.die();
      } else if (spr.y + spr.h > 196) {
        this.die();
      } else {
        this.spritesMesh.move(contra.pjs.vector.point(...this.vector));
      }
    }
  }

  drawShadow() {
    const sh = this.shadow;
    const spr = this.spritesArr[this.selectedState];
    sh.x = spr.x + 1;
    sh.w = spr.w - 2;
    const platforms = contra.selectedLevel.platformActual.filter(
      (platform) => platform.collision === 'BOTTOM' &&
      platform.sprite.isStaticIntersect(spr.getStaticBoxS(0, spr.h * 0.8, -2, 40)),
    );
    if (platforms.length > 0) {
      sh.y = platforms[0].sprite.y - 2;
      sh.setAlpha(1 - ((sh.y - spr.y - spr.h) * 0.02));
      sh.draw();
    }
  }

  die() {
    this.spritesArr[1].visible = true;
    this.spritesArr[0].visible = false;
    this.selectedState = 1;
    setTimeout(() => {
      this.arrTo.splice(this.arrTo.indexOf(this), 1);
      this.arrFrom.push(this);
    }, 500);
  }
}