import Char from './char';

const FONT_INDEX = ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯІЎ".-,!>\'';
const CHAR_WIDTH = 8;
const CHAR_HEIGHT = 8;
const SPRITE_LENGTH = 632;
const SCREEN_WIDTH = 32;

export default class TextLayer {
  constructor(pjs) {
    this.chars = [];
    this.pjs = pjs;

    this.font = pjs.game.newAnimationObject({
      animation: pjs.tiles.newImage('../assets/fonts/font.png')
        .getAnimation(0, 0, CHAR_WIDTH, CHAR_HEIGHT, SPRITE_LENGTH / CHAR_WIDTH),
      x: 0,
      y: 0,
      w: CHAR_WIDTH,
      h: CHAR_HEIGHT,
    });
  }

  // Отрисовывает все не скрытые символы на экране
  draw() {
    this.chars.forEach((char) => {
      if (char.visible) {
        this.font.setPosition(this.pjs.vector.point(char.x * CHAR_WIDTH, char.y * CHAR_HEIGHT));
        this.font.drawFrame(char.index);
      }
    });
  }

  // Добавить текстовую строку на слой по указанным координатам
  addText(x, y, text) {
    text.toUpperCase().split``.forEach((char, dx) => {
      const position = FONT_INDEX.indexOf(char);

      this.chars.push(
        new Char(x + dx, y, position === -1 ? SPRITE_LENGTH / CHAR_WIDTH - 1 : position),
      );
    });
  }

  // Добавить строку на слой, отцентровав по ширине экрана
  addCenteredText(y, text) {
    this.addText(Math.floor((SCREEN_WIDTH - text.length) / 2), y, text);
  }

  // Очищает текстовый слой
  clear() {
    this.chars.length = 0;
  }

  // Очистить прямоугольный регион с верхним левым углом в (x, y) шириной w и высотой h.
  clearRegion(x, y, w, h) {
    const newArr = [];
    this.chars.forEach((c) => {
      if ((x > c.x) || (c.x >= x + w) || (y > c.y) || (c.y >= y + h)) {
        newArr.push(c);
      }
    });

    this.chars.length = 0;
    this.chars = newArr;
  }

  // Скрыть символы в прямоугольнике с верхним левым углом в (x, y) шириной w и высотой h.
  // Если ширина не указана, скрываются все символы
  setRegionInvisible(x, y, w, h) {
    if (w === undefined) {
      this.chars.forEach((char) => {
        const c = char;
        c.visible = false;
      });
    } else {
      this.chars.forEach((char) => {
        const c = char;
        if ((x <= c.x) && (c.x < x + w) && (y <= c.y) && (c.y < y + h)) {
          c.visible = false;
        }
      });
    }
  }

  // Показать скрытые символы в прямоугольнике с верхним левым углом в (x, y) шириной w и высотой h.
  // Если ширина не указана, становятся видимыми все скрытые символы
  setRegionVisible(x, y, w, h) {
    if (w === undefined) {
      this.chars.forEach((char) => {
        const c = char;
        c.visible = true;
      });
    } else {
      this.chars.forEach((char) => {
        const c = char;
        if ((x <= c.x) && (c.x < x + w) && (y <= c.y) && (c.y < y + h)) {
          c.visible = true;
        }
      });
    }
  }
}
