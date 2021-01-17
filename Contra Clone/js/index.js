/*import Level from './level.js';
import Player from './player.js';*/
//export { contra, game, tiles };

let pjs = new PointJS(256, 224, { backgroundColor: '#000000' })
const game = pjs.game;
let tiles = pjs.tiles;
let keyControl = pjs.keyControl;
let p = pjs.vector.point;
let camera = pjs.camera;

keyControl.initControl();
//pjs.system.setSmoothing(true);

//pjs.system.initFullPage();

window.onresize = resize;

let contra = {
  options: {

  },
  player: new Player('default', game),
  cameraPositionX: 0,

  startGame: () => {

  }
}


//pjs.camera.scale(p(contra.options.zoom, contra.options.zoom));

contra.selectedLevel = new Level(0, pjs);


game.newLoop('myGame', function() {
  game.clear();

  contra.selectedLevel.bgArray.forEach(el => {
    el.sprite.draw();
  });
  contra.selectedLevel.elementsArray.forEach(el => {
    el.sprites.forEach(sp => {
      sp.draw();
    });
  });
  /*
    contra.selectedLevel.platformActual.forEach(element => {
      element.sprite.drawStaticBox();
    });*/


  //pjs.camera.move(pjs.vector.point(1, 0));
  contra.player.calculateMoves(contra, pjs, [
    keyControl.isDown('UP') || keyControl.isDown('W'),
    keyControl.isDown('RIGHT') || keyControl.isDown('D'),
    keyControl.isDown('BOTTOM') || keyControl.isDown('S'),
    keyControl.isDown('LEFT') || keyControl.isDown('A'),
    keyControl.isDown('P'),
    keyControl.isDown('O'),
    keyControl.isDown('SPACE')
  ]);

  //contra.player.spritesMesh.move(p(dXY[0], dXY[1]));
  //

  /*
    if (keyControl.isDown('SPACE')) {
      if (game.isStopped()) {
        game.resume();
      } else {
        game.stop();
      }
    }*/

  contra.player.spritesMesh.draw()
    //  contra.player.selectedState.sprite.drawStaticBox();
})

game.setLoop('myGame');
game.start();

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

setTimeout(() => {
  resize();
}, 500);