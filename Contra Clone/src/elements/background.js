import Platform from '../platform';
import contra from '../index';

export default class Background {
  constructor(path, platforms, paddons, level) {
    this.img = contra.res.levelS[path];
    this.sprite = contra.pjs.game.newAnimationObject({
      animation: this.img.getAnimation(0, 0, level.length + 256, 224, 1),
      x: 0,
      y: 0,
      w: level.length + 256,
      h: 224,
      delay: 100,
    });

    this.signal = contra.pjs.game.newAnimationObject({
      animation: contra.res.elementS.getAnimation(217, 31, 17, 3, 4),
      x: 0,
      y: 0,
      w: 17,
      h: 3,
      delay: 1000,
    });

    for (let i = 0; i < platforms.length; i += 1) {
      const {
        x,
        y,
        w,
        h,
        collision,
      } = platforms[i];
      const canFallDown = !!platforms[i].canFallDown;
      level.platformActual.push(new Platform(w, h, x, y, collision, canFallDown));
    }

    this.paddons = paddons;

    for (let i = 0; i < paddons.length; i += 1) {
      const {
        x,
        y,
        length,
        needVertical,
      } = paddons[i];

      let w = 48;
      if (length > 1) {
        w += 42 + (32 * (length - 2));
      }

      if (paddons[i].back) {
        this.paddons[i].x -= 16;
        console.log(this.paddons[i]);
      }

      const canFallDown = !paddons[i].cantFallDown;
      level.platformActual.push(new Platform(w, 1, x, y, 'BOTTOM', canFallDown));
      if (needVertical) {
        level.platformActual.push(new Platform(w, 40, x, y + 1, 'VERTICAL', false));
      }
    }
  }

  tryAction() {
    this.sprite.draw();
    this.paddons.forEach((p) => {
      this.signal.x = p.x + 25;
      this.signal.y = p.y + 11;
      this.signal.draw();
      if (p.length > 1) {
        for (let i = 1; i < p.length; i += 1) {
          this.signal.x += 32;
          this.signal.draw();
        }
      }
    });
  }
}
