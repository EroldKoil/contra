/* eslint-disable*/

import Bullet from './bullet';
import contra from '../index';

export default class BulletF extends Bullet {
  constructor(x, y, dx, dy, level) {
    super(1, x, y, dx, dy);
    this.deg = 0;
    this.sprite = this.createSprite(level.elementsInfo.shootF, contra.res.elementS, x /*+ xy[0]*/ , y /*+ xy[1]*/ );
    this.d = 12;

    /* for (let i = 0; i < 1; i += 1) {
       const xy = this.getDxy(this.deg + (Math.PI / 3) * i, this.d);
       this.sprites.push(this.createSprite(level.elementsInfo.shootF, contra.res.elementS, x + xy[0], y + xy[1]));
     }*/
  }

  draw(level, bulletsArray) {
    this.deg = (this.deg + Math.PI / 8) % (2 * Math.PI);
    const p = contra.pjs.vector.point;
    this.x += this.dx;
    this.y += this.dy;

    if (this.sprite.isStaticIntersect(level.levelBorder.sprite.getStaticBox())) {
      const xy = this.getDxy(this.deg + (Math.PI / 3), this.d);
      this.sprite.setPosition(p(this.x + xy[0], this.y + xy[1]));
      this.sprite.draw();
    } else {
      bulletsArray.splice(bulletsArray.indexOf(this), 1);
    }
  }

  getDxy(alfa, d) {
    return [d * Math.cos(alfa), -d * Math.sin(alfa)];
  }
}


/*
draw(level, bulletsArray) {
    this.deg = (this.deg + Math.PI / 8) % (2 * Math.PI);
    let flag = false;
    const p = contra.pjs.vector.point;
    this.x += this.dx;
    this.y += this.dy;

    for (let i = 0; i < this.sprites.length; i += 1) {
      let spr = this.sprites[i];
      if (spr) {
        if (spr.isStaticIntersect(level.levelBorder.sprite.getStaticBox())) {
          flag = true;
          const xy = this.getDxy(this.deg + (Math.PI / 3) * i, this.d);
          spr.setPosition(p(this.x + xy[0], this.y + xy[1]));
          spr.draw();
        } else {
          spr = null;
        }
      }
		}
		
    if (!flag) {
      bulletsArray.splice(bulletsArray.indexOf(this), 1);
    }
  }
*/