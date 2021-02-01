/* eslint-disable */

//import Level from './level';
import Player from './player';
import PointJS from './pointjs_0.2.0.9';
import mainMenu from './mainmenu';
import getLanguageObject from './multilang';
import Options from './options';
import Sound from './sound';
import Joystick from './joystick';

import gameComplite from './gameComplite';

function resize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  const wNorm = 256;
  const hNorm = 224;
  const canvas = document.querySelector('canvas');
  if (width / height > wNorm / hNorm) {
    width = (wNorm / hNorm) * height;
  } else {
    height = (width / wNorm) * hNorm;
  }
  canvas.style.width = `${width}px`;
  canvas.style.left = `${(window.innerWidth - width) / 2}px`;
  canvas.style.top = `${(window.innerHeight - height) / 2}px`;
}

Sound.init();

const contra = {
  pjs: new PointJS(256, 224, { backgroundColor: 'black' }),
  options: new Options(),
  selectedLevel: null,
  player: null,
  startGame: null,
  lang: null,
  joystick: null,
  lives: 3,
  hardLevel: 0,
  results: {
    score: 0,
    scoreForLife: 0,
    kills: 0,
    killsBoss: 0,
  }
};
export default contra;

const { pjs } = contra;


// Инициализация свойств, недоступных при создании объекта
const { newImage } = contra.pjs.tiles;
contra.res = {
  playerS: newImage('./assets/sprites/player/player.png'),
  levelS: [
    newImage('./assets/sprites/levels/1/spritesheet.png'),
    newImage('./assets/sprites/levels/2/spritesheet.png'),
    newImage('./assets/sprites/levels/3/level6.png'),
  ],
  elementS: newImage('./assets/sprites/elements.png'),
  enemyS: newImage('./assets/sprites/enemy.png'),
  boss: newImage('./assets/sprites/boss/boss.png'),
};

// метод сохранения хайскора

contra.startGame = () => {
  if (pjs.touchControl.isTouchSupported()) {
    contra.joystick.show();
  }
  const interval = setInterval(() => {
    if (contra.pjs.resources.isLoaded()) {
      clearInterval(interval);
      Sound.playMusic(contra.selectedLevel.levelNumber + 1);
      pjs.camera.setPosition(pjs.vector.point(0, 0));
      if (contra.player) {
        const { player } = contra;
        player.reBurn();
        player.setLevel(contra.selectedLevel);
      } else {
        contra.player = new Player(contra.selectedLevel);
      }

      const interval1 = setInterval(() => {
        if (contra.pjs.resources.isLoaded()) {
          clearInterval(interval1);
          contra.selectedLevel.startLevel();
        }
      }, 200);
    }
  }, 200);
};

contra.addScore = (score) => {
  contra.results.score += score;
  if (score > 900) {
    contra.results.killsBoss += 1;
  } else {
    contra.results.kills += 1;
  }
  contra.results.scoreForLife += score;
  if (contra.results.scoreForLife > 20000) {
    contra.results.scoreForLife -= 20000;
    Sound.play('plusLife');
    contra.player.lifes += 1;
  }
};

contra.lang = getLanguageObject(contra.options.get('language'));

document.querySelector('dialog').showModal(); // Показать модальное окно

function buttonPress() {
  document.querySelector('dialog').close();
  //gameComplite();
  mainMenu(contra); // Все стартует отсюда!
}

// Обработчик кнопки модального окна

document.getElementById('start-button').addEventListener('click', buttonPress);
document.getElementById('start-button').addEventListener('touchend', buttonPress);

window.onresize = resize;

pjs.keyControl.initControl();

if (pjs.touchControl.isTouchSupported()) {
  document.getElementById('start-button').addEventListener('touchend', buttonPress);
  pjs.touchControl.initControl();
  contra.joystick = new Joystick();
  contra.joystick.hide();
}


function resizeInit() {
  if (document.querySelector('canvas') === null) {
    setTimeout(resizeInit, 50);
  } else {
    resize();
  }
}

resizeInit();