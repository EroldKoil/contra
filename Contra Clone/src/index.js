//import exports from 'webpack';
import Level from './level.js';
import Player from './player.js';
import PointJS from './pointjs_0.2.0.9.js';

const pjs = new PointJS(256, 224, { backgroundColor: '#000000' });

//let tiles = pjs.tiles;
//let p = pjs.vector.point;
//let camera = pjs.camera;
let contra;
export default pjs;

pjs.keyControl.initControl();

window.onresize = resize;

function startSession() {
  contra = {
    options: null,
    selectedLevel: null,
    menu: null,
    player: null,
    startGame: () => {
      if (contra.selectedLevel) {
        contra.selectedLevel = new Level(this.selectedLevel.levelNumber + 1, contra);
      } else {
        contra.selectedLevel = new Level(0, contra);
      }
      contra.player = new Player('default', contra.selectedLevel);
    }
  }

  // Здесь можно сделать проверку локалстореж и в зависимости от этого создавать опции. А после этого создавать меню
  // когда в меню нажмем START , вызовем через 5 секунд метод contra.startGame(). А в это время будет заставка экрана перед уровнем


  contra.startGame();
  pjs.game.start();

  setTimeout(() => {
    resize();
  }, 500);
}

function resize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  let wNorm = 256;
  let hNorm = 224;
  let canvas = document.querySelector('canvas');
  if (width / height > wNorm / hNorm) {
    width = wNorm / hNorm * height;
  } else {
    height = width / wNorm * hNorm
  }
  canvas.style.width = width + 'px';
  canvas.style.left = (window.innerWidth - width) / 2 + 'px';
  canvas.style.top = (window.innerHeight - height) / 2 + 'px';
}

startSession();