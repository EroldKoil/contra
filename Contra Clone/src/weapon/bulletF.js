import Bullet from './bullet';
import pjs from '../index';

export default class BulletF extends Bullet {
  constructor(x, y, dx, dy, level) {
      super(1, x, y, dx, dy);
      this.deg = 0;
      this.sprites = [];
      this.d = 4;

      for (let i = 0; i < 4; i++) {
        let xy = this.getDxy(this.deg + Math.PI / 4 * i, this.d)
        this.sprites.push(this.createSprite(level.elementsInfo['shootF'], level.elementSprites, x + xy.x, y + xy.y));
      }
    }
    /*
      draw(level, bulletsArray) {
    		for (let i = 0; i < 4; i++) {
          let xy = this.getDxy(this.deg + Math.PI / 4 * i, this.d)
          this.sprites.push(this.createSprite(level.elementsInfo['shootF'], level.elementSprites, x + xy.x, y + xy.y));
        }


    		obj.setPosition( .point(100, 100) );
        this.sprite.move(pjs.vector.point(this.dx, this.dy));
        if (!this.sprite.isStaticIntersect(level.levelBorder.sprite.getStaticBox())) {
          bulletsArray.splice(bulletsArray.indexOf(this), 1);
        } else {
          // проверка на попадание в противника или игрока. зависит от хозяина пули
        }

        this.sprite.draw();

      }*/

  getDxy(vector, d) {
    return [d * Math.cos(vector), -d * Math.sin(vector)]
  }

}