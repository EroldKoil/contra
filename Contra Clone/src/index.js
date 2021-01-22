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
  pjs: new PointJS(256, 224, { backgroundColor: 'black' }),
  options: new Options(),
  selectedLevel: null,
  player: null,
  startGame: null,
  lang: null,
};

// Инициализация свойств, недоступных при создании объекта
contra.player = new Player('default', contra.pjs);
contra.startGame = () => {
  if (contra.selectedLevel) {
    contra.selectedLevel = new Level(this.selectedLevel.levelNumber + 1, contra.pjs, contra);
  } else {
    contra.selectedLevel = new Level(0, contra.pjs, contra);
  }
};
contra.lang = getLanguageObject(contra.options.get('language'));

const { pjs } = contra;

document.querySelector('dialog').showModal(); // Показать модальное окно

// Обработчик кнопки модального окна
document.getElementById('start-button').addEventListener('click', () => {
  document.querySelector('dialog').close();
  mainMenu(contra); // Все стартует отсюда!
});

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
