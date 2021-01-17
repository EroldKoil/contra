/*import Level from './level.js';
import Player from './player.js';
import Joystick from './joystick.js'*/



let pjs = new PointJS(256, 224, { backgroundColor: '#000000' })
const game = pjs.game;
let tiles = pjs.tiles;
//let p = pjs.vector.point;
//let camera = pjs.camera;
let contra;

pjs.keyControl.initControl();

window.onresize = resize;



function startSession() {
  contra = {
    joystick: new Joystick(pjs),
    options: null,
    selectedLevel: null,
    menu: null,
    player: new Player('default', game),
    startGame: () => {
      if (this.selectedLevel) {
        contra.selectedLevel = new Level(this.selectedLevel.levelNumber + 1, pjs, contra);
      } else {
        contra.selectedLevel = new Level(0, pjs, contra);
      }
    }
  }

  // Здесь можно сделать проверку локалстореж и в зависимости от этого создавать опции. А после этого создавать меню
  // когда в меню нажмем START , вызовем через 5 секунд метод contra.startGame(). А в это время будет заставка экрана перед уровнем

 // pjs.touchControl.initTouchControl();
  pjs.mouseControl.initMouseControl();
  contra.player = new Player('default', game);
  contra.startGame();
  game.start();

  setTimeout(() => {
    resize();
  }, 500);
}



/*
game.newLoop('myGame', function() {
  //game.clear();

  contra.selectedLevel.bgArray.forEach(el => {
    el.sprite.draw();
  });
  contra.selectedLevel.elementsArray.forEach(el => {
    el.sprites.forEach(sp => {
      sp.draw();
    });
  });

  console.log('buttons in index: ', joystick.buttons )

  contra.player.calculateMoves(contra, pjs, [
    keyControl.isDown('UP') || keyControl.isDown('W') || joystick.buttons.up,
    keyControl.isDown('RIGHT') || keyControl.isDown('D') || joystick.buttons.right,
    keyControl.isDown('BOTTOM') || keyControl.isDown('S') || joystick.buttons.down,
    keyControl.isDown('LEFT') || keyControl.isDown('A') || joystick.buttons.left,
    keyControl.isDown('P'),
    keyControl.isDown('O'),
    keyControl.isDown('SPACE')
  ]);
  
 // contra.player.spritesMesh.draw()
})
*/
//game.setLoop('myGame');


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