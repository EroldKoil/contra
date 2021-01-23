/* eslint-disable spaced-comment */
/* eslint-disable import/no-cycle */
/* eslint-disable eol-last */

import TextLayer from './text';
import getLanguageObject from './multilang';
import titleSound from '../assets/audio/title.mp3';
import contra from './index';

function createMenuText(textLayer, lang) {
  textLayer.clear();
  textLayer.addText(5, 17, lang.menu);
  textLayer.addText(7, 19, lang.startGame);
  textLayer.addText(7, 21, lang.language);
  textLayer.addText(7, 23, lang.controls);
}

export default function mainMenu() {
  const KEYS = ['keyUp', 'keyDown', 'keyLeft', 'keyRight', 'keyFire', 'keyJump'];
  const { pjs, lang } = contra;

  const titleScreen = pjs.game.newImageObject({
    file: '../assets/main_menu/menu_bg.png',
    x: 0,
    y: 0,
    w: 256,
    h: 224,
  });

  const selEagle = pjs.game.newImageObject({
    file: '../assets/main_menu/eagle_selector.png',
    x: 0,
    y: 0,
    w: 16,
    h: 16,
  });

  // Создаем и заполняем слой текста в меню
  const textLayer = new TextLayer(pjs);
  createMenuText(textLayer, lang);

  let cameraPosition = -256;
  let menuState; // 0, 1, 2 - пункты меню. 3+ - переназначение клавиш. 9 - сохранение клавиш.
  let keyUp = contra.options.get('keyUp');
  let keyDown = contra.options.get('keyDown');
  let keyFire = contra.options.get('keyFire');
  let newKeys;
  let delay = 30; // Задержка перед началом опроса клавиатуры при переназначении клавиш управления

  pjs.game.newLoop('main_menu', () => {
    if (cameraPosition !== 0) {
      cameraPosition = (pjs.keyControl.getCountKeysDown() > 0) ? 0 : cameraPosition + 1;

      pjs.camera.setPosition(pjs.vector.point(cameraPosition, 0));
    } else {
      pjs.OOP.once('PlayTitleSound', () => {
        new Audio(titleSound).play();
        menuState = 0;
      });
    }

    titleScreen.draw();

    if (menuState !== undefined) {
      // Рисуем орла
      selEagle.setPosition(pjs.vector.point(5 * 8 - 4, (19 + 2 * Math.min(menuState, 2)) * 8 - 4));
      selEagle.draw();

      // Отрабатываем перемещение орла
      if (pjs.keyControl.isPress(keyDown)) {
        if (menuState <= 1) menuState += 1;
        else if (menuState === 2) menuState = 0;
      }

      if (pjs.keyControl.isPress(keyUp)) {
        if (menuState === 1 || menuState === 2) menuState -= 1;
        else if (menuState === 0) menuState = 2;
      }

      // Обработка разных пунктов меню
      if (pjs.keyControl.isPress(keyFire)) {
        switch (menuState) {
          case 0:
            // Тут вызываем черный экран перед уровнем // Пока что вызов уровня
            contra.startGame();
            break;
          case 1:
            // Смена языка приложения
            contra.options.set('language', (contra.options.get('language') + 1) % 3);
            contra.lang = getLanguageObject(contra.options.get('language'));
            createMenuText(textLayer, contra.lang);
            break;
          case 2:
            // Запуск переназначения клавиш управления
            menuState = 3;
            delay = 60;
            newKeys = new Array(6);
            break;
          default:
            break;
        }
      }

      // Обработка переназначения клавиш управления
      if (menuState >= 3 && delay === 0) {
        if (menuState === 9) {
          // Сохранение новых значений
          createMenuText(textLayer, contra.lang);
          menuState = 2;
          newKeys.forEach((key, index) => {
            contra.options.set(KEYS[index], key);
          });
          keyUp = contra.options.get('keyUp');
          keyDown = contra.options.get('keyDown');
          keyFire = contra.options.get('keyFire');
        } else {
          textLayer.clearRegion(7, 23, 24, 1);
          textLayer.addText(7, 23, `${contra.lang.setControl}${contra.lang[KEYS[menuState - 3]]}`);
          const key = pjs.keyControl.getLastKeyPress();
          if (key && !newKeys.includes(key)) { // Если новой клавиши нет в уже назначенных
            newKeys[menuState - 3] = key;
            menuState += 1;
          }
        }
      } else {
        delay -= 1;
      }
    }
    textLayer.draw();
  });

  pjs.game.setLoop('main_menu');
  pjs.game.start();
}