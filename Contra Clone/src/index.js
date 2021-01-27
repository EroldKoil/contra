/* eslint-disable eol-last */
/* eslint-disable import/no-cycle */
// import exports from 'webpack';
import Level from './level';
import Player from './player';
import PointJS from './pointjs_0.2.0.9';
import mainMenu from './mainmenu';
import getLanguageObject from './multilang';
import Options from './options';

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

const contra = {
  score: 0,
  pjs: new PointJS(256, 224, { backgroundColor: 'black' }),
  options: new Options(),
  selectedLevel: null,
  player: null,
  startGame: null,
  lang: null,
};
export default contra;

// Инициализация свойств, недоступных при создании объекта
const { newImage } = contra.pjs.tiles;
contra.res = {
  playerS: newImage('./assets/sprites/player/player.png'),
  levelS: newImage('./assets/sprites/levels/1/spritesheet.png'),
  elementS: newImage('./assets/sprites/elements.png'),
  enemyS: newImage('./assets/sprites/enemy.png'),
  boss: newImage('./assets/sprites/boss/boss.png'),
};

contra.startGame = () => {
  const interval = setInterval(() => {
    if (contra.pjs.resources.isLoaded()) {
      clearInterval(interval);
      if (contra.selectedLevel) {
        contra.selectedLevel = new Level(contra.selectedLevel.levelNumber + 1, contra);
      } else {
        contra.selectedLevel = new Level(0, contra);
      }
      contra.player = new Player(contra.selectedLevel);
    }
  }, 200);
};

contra.lang = getLanguageObject(contra.options.get('language'));

const { pjs } = contra;

//document.querySelector('dialog').showModal(); // Показать модальное окно

// Обработчик кнопки модального окна
/*document.getElementById('start-button').addEventListener('click', () => {
  document.querySelector('dialog').close();
  mainMenu(); // Все стартует отсюда!
});*/

mainMenu();

window.onresize = resize;

pjs.keyControl.initControl();

function resizeInit() {
  if (document.querySelector('canvas') === null) {
    setTimeout(resizeInit, 50);
  } else {
    resize();
  }
}

resizeInit();