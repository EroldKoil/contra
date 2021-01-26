/* eslint-disable */

import contra from '../index';
import SprObject from '../sprObject';

export default class Bonus extends SprObject {
  constructor(xCenter, yBottom, type, level) {
    super(xCenter, yBottom, 0, 0);
    this.type = type;
    this.level = level;
    this.vectorX = 1;
    this.vectorY = -2;
    setTimeout(() => {
      this.vectorY = 2;
    }, 375);

    this.sprite = this.createSprite(level.elementsInfo[`bonus${type}`], contra.res.elementS, xCenter, yBottom);
  }

  tryAction() {
    const spr = this.sprite;
    if (this.vectorY !== 0) {
      let dy = this.vectorY;
      if (this.vectorY > 0) {
        const collisionSArray = this.level.platformActual.filter((platform) =>
          (platform.collision === 'BOTTOM' || platform.collision === 'WATER') &&
          platform.sprite.isStaticIntersect(spr.getStaticBoxS(0, 0, 0, this.vectorY))
        );
        if (collisionSArray.length > 0) {
          dy = collisionSArray[0].sprite.y - (spr.y + spr.h);
          this.vectorY = 0;
        }
      }
      spr.move(contra.pjs.vector.point(this.vectorX, dy))
    }

    spr.draw();
    const camPos = contra.pjs.camera.getPosition().x;
    this.tryRemove(false, camPos);
    const { player } = contra;
    if (spr.isStaticIntersect(player.selectedState.sprite.getStaticBox())) {
      player.weapon.changeWeapon(this.type);
      this.tryRemove(true);
    }

  }

  tryRemove(die, camPos) {
    if (die || camPos > this.xCenter + 20) {
      this.level.elementsActual.splice(this.level.elementsActual.indexOf(this), 1);
    }
  }
}