import contra from '../index';
import SprObject from '../sprObject';
import Sound from '../sound';

export default class Bonus extends SprObject {
  constructor(xCenter, yBottom, type, level) {
    super(xCenter, yBottom, 0, 0);
    this.score = 1000;
    this.type = type;
    this.level = level;
    this.vectorX = 1;
    this.vectorY = -2;
    setTimeout(() => {
      this.vectorY = -1;
      setTimeout(() => {
        this.vectorY = 1;
        setTimeout(() => {
          this.vectorY = 2;
        }, 100);
      }, 100);
    }, 300);

    this.sprite = this.createSprite(level.elementsInfo[`bonus${type}`], contra.res.elementS, xCenter, yBottom);
    this.shadow = this.createSprite(
      level.elementsInfo.shadow, contra.res.elementS, xCenter, yBottom,
    );
  }

  tryAction() {
    const spr = this.sprite;
    if (this.vectorY !== 0) {
      let dy = this.vectorY;
      if (this.vectorY > 0) {
        const collisionSArray = this.level.platformActual.filter((platform) => (platform.collision === 'BOTTOM' || platform.collision === 'WATER')
          && platform.sprite.isStaticIntersect(spr.getStaticBoxS(0, 0, 0, this.vectorY)));
        if (collisionSArray.length > 0) {
          dy = collisionSArray[0].sprite.y - (spr.y + spr.h);
          this.vectorY = 0;
        }
      }
      spr.move(contra.pjs.vector.point(this.vectorX, dy));
    }
    this.drawShadow();
    spr.draw();

    const camPos = contra.pjs.camera.getPosition().x;
    this.tryRemove(false, camPos);
    const { player } = contra;
    if (spr.isStaticIntersect(player.selectedState.sprite.getStaticBox())) {
      contra.addScore(this.score);
      Sound.play('boost');
      if (this.type === 'R') {
        player.weapon.upgrate();
      } else if (this.type === 'B') {
        player.setAssailable(12000);
      } else {
        player.weapon.changeWeapon(this.type);
      }
      this.tryRemove(true);
    }
  }

  tryRemove(die, camPos) {
    if (die || camPos > this.xCenter + 20) {
      this.level.bonuses.splice(this.level.elementsActual.indexOf(this), 1);
    }
  }

  drawShadow() {
    const sh = this.shadow;
    const spr = this.sprite;
    sh.x = spr.x + 1;
    sh.w = spr.w - 2;
    const platforms = this.level.platformActual.filter(
      (platform) => platform.collision === 'BOTTOM'
      && platform.sprite.isStaticIntersect(spr.getStaticBoxS(0, spr.h * 0.8, -2, 40)),
    );
    if (platforms.length > 0) {
      sh.y = platforms[0].sprite.y - 2;
      sh.setAlpha(1 - ((sh.y - spr.y - spr.h) * 0.02));
      sh.draw();
    }
  }
}
