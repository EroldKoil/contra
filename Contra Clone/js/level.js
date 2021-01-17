//import Bg from './bg.js';

const map = {
  blockSize: 32,
  levels: [{
    bg: [
      ['s1', 's2', 0, 0, 'w', 'w1', 'w'],
      ['s2', 0, 'g1', 'p1', 'r1', 'rw1', 'w'],
      ['s1', 0, 'g2', 'p1', 'r1', 'rw1', 'w'],
      ['m1', 'm2', 'g2', 'p1', 'r1', 'rw1', 'w'],
      ['m3', 'm4', 'g2', 'p1', 'r1', 'rw4', 'w2'],
      ['m5', 'm6', 'g2', 'p1', 'p1', 'r1', 'w3'],
      ['m3', 'm4', 'g2', 'p1', 'p1', 'r1', 'w3'],
      ['m7', 'm8', 'g2', 'p1', 'p1', 'r1', 'w3'],
      ['s1', 0, 'g2', 'p1', 'r1', 'p1', 'w4'],
      ['s2', 0, 'g2', 'p1', 'r1', 'r1', 'pw1-n'],
      ['m1', 'm2', 'g2', 'p1', 'r1', 'r1', 'pw1-n'],
      ['m3', 'm4', 'g2', 'p1', 'r1', 'p1', 'w5'],
      ['m5', 'm6', 'g2', 'p1', 'r1', 'rw2', 'w8'],
      ['m3', 'm4', 'g2', 'p1', 'p1', 'r1', 'w3'],
      ['m3', 'm4', 'g2', 'p1', 'p1', 'r1', 'w3'],
      ['m5', 'm6', 'g2', 'p1', 'r1', 'rw3', 'w6'],
      ['m3', 'm4', 'g2', 'p1', 'r1', 'rw1', 'w'],
      ['m5', 'm6', 'g2', 'p1', 'r1', 'rw4', 'w2'],
      ['m3', 'm4', 'g2', 'p1', 'r1', 'r1', 'w4'],
      ['m5', 'm6', 'g2', 'p1', 'r1', 'r1', 'pw1-n'],
      ['m7', 'm8', 'g2', 'p1', 'p2', 'r1', 'pw1-n'],
      [0, 's1', 'g2', 'p1', 'p2', 'r1', 'w5'],
      ['s1', 's2', 'g2', 'p1', 'p2', 'r1', 'w3'],
      [0, 0, 'g3', 'p1', 'r1', 'rw3', 'w6'],
      ['s1', 0, 0, 'b4', 'w', 'w7', 'w'],
      ['s2', 0, 's2', 0, 'w', 'w', 'w'],
      [0, 's1', 0, 0, 'w', 'w', 'w'],
      ['s3', 's2', 0, 'b5', 'w', 'w1', 'w'],
      ['s2', 's1', 'g1', 'p1', 'r1', 'rw1', 'w'],
      ['s2', 's1', 'g2', 'p1', 'r1', 'rw1', 'w'],
      [0, 0, 'g2', 'p1', 'r1', 'rw1', 'w'],
      ['s1', 0, 'g2', 'p1', 'r1', 'rw1', 'w'],
      [0, 's2', 'g3', 'p1', 'r1', 'rw1', 'w'],
      [0, 's2', 0, 'b4', 'w', 'w7', 'w'],
      [0, 0, 0, 0, 'w', 'w', 'w'],
      ['s2', 's1', 0, 0, 'w', 'w', 'w'],
      ['s1', 0, 0, 'b5', 'w', 'w1', 'w'],
      [0, 0, 'g1', 'p1', 'r1', 'rw1', 'w'],
      ['s2', 0, 'g2', 'p1', 'r1', 'rw4', 'w2'],
      ['m1', 'm2', 'g2', 'p1', 'r1', 'r1', 'w3'],
      ['m3', 'm4', 'g2', 'p1', 'r1', 'r1', 'w3'],
      ['m7', 'm8', 'g2', 'p1', 'r1', 'r1', 'w3'],
      ['s2', 's1', 'g3', 'p1', 'r1', 'r1', 'w3'],
      ['g4', 'g6', 'p1', 'p1', 'r1', 'r1', 'w4'],
      ['g5', 'g6', 'p1', 'p1', 'r1', 'r1', 'pw1-n'],
      ['g5', 'g6', 'p1', 'r1', 'r1', 'r1', 'pw1-n'],
      ['g5', 'g6', 'p1', 'r1', 'r1', 'r1', 'pw1-n'],
      ['g5', 'g6', 'p1', 'p1', 'p2', 'r1', 'w5'],
      ['g5', 'g6', 'p1', 'r1', 'p2', 'r1', 'w3'],
      ['g5', 'g6', 'p1', 'r1', 'r1', 'rw2', 'w8'],
      ['g5', 'g6', 'p1', 'r1', 'p1', 'r1', 'w3'],
      ['g5', 'g6', 'p1', 'r1', 'p1', 'r1', 'w3'],
      ['g5', 'g6', 'p1', 'r1', 'p1', 'r1', 'w3'],
      ['g5', 'g6', 'p1', 'r1', 'p1', 'r1', 'w4'],
      ['g5', 'g6', 'p1', 'r1', 'p1', 'r1', 'pw1-n'],
      ['g5', 'g6', 'p1', 'r1', 'p1', 'r1', 'pw2-n'],
      ['g5', 'g6', 'p1', 'r1', 'p1', 'r1', 'p1-n'],
      ['g5', 'g6', 'p1', 'r1', 'r1', 'r1', 'p1-n'],
      ['g5', 'g6', 'p1', 'p1', 'r1', 'r1', 'p1-n'],
      ['g5', 'g7', 'g6', 'p1', 'r1', 'r1', 'p1-n'],
      ['g5', 'g7', 'g6', 'p1', 'r1', 'p1', 'r1'],
      ['g5', 'g7', 'g6', 'p1', 'r1', 'p1', 'r1'],
      ['g5', 'g7', 'g6', 'p1', 'r1', 'r1', 'r1'],
      ['g5', 'g7', 'g6', 'p1', 'r1', 'p1', 'r1'],
      ['g5', 'g6', 'p1', 'p1', 'r1', 'p1', 'r1'],
      ['g5', 'g6', 'p1', 'r1', 'r1', 'r1', 'r1'],
      ['g5', 'g6', 'p1', 'r1', 'p2', 'r1', 'r1'],
      ['g5', 'g6', 'p1', 'r1', 'r1', 'r1', 'r1'],
      ['g5', 'g6', 'p1', 'r1', 'p1', 'r1', 'r1'],
      ['g5', 'g7', 'g7', 'g6', 'p1', 'r1', 'r1'],
      ['g5', 'g7', 'g6', 'p1', 'p1', 'r1', 'r1'],
      ['g5', 'g7', 'g6', 'p1', 'r1', 'r1', 'r1'],
      ['g5', 'g7', 'g7', 'g7', 'g7', 'g7', 'g7'],
      ['g5', 'g7', 'g7', 'g6', 'p1', 'r1', 'r1'],
      ['g5', 'g7', 'g7', 'p1', 'p1', 'r1', 'r1'],
      ['g5', 'g7', 'g7', 'p1', 'r1', 'r1', 'r1'],
      ['g5', 'g7', 'g7', 'g7', 'g7', 'g7', 'g7'],
      ['g5', 'g7', 'g7', 'g6', 'p1', 'r1', 'p1-n'],
      ['g5', 'g7', 'g7', 'g6', 'p1', 'p1', 'r1'],
      ['g5', 'g7', 'g7', 'g7', 'g6', 'p1', 'r1'],
      ['g5', 'g7', 'g7', 'g7', 'g6', 'p1', 'r1'],
      ['g5', 'g7', 'g6', 'p1', 'r1', 'r1', 'r1'],
      ['g5', 'g6', 'p1', 'p1', 'r1', 'r1', 'p1-n'],
      ['g5', 'g6', 'p1', 'r1', 'p2', 'r1', 'r1'],
      ['g5', 'g7', 'g7', 'g7', 'g7', 'g7', 'g7'],
      ['g8', 'g9', 'g6', 'p1', 'r1', 'r1', 'r1'],
      ['g8', 'g5', 'g6', 'p1', 'p1', 'r1', 'r1'],
      ['g8', 'g5', 'g7', 'g6', 'p1', 'r1', 'r1'],
      ['g8', 'g5', 'g7', 'g6', 'p1', 'r1', 'r1'],
      ['g8', 'g5', 'g7', 'g6', 'p1', 'r1', 'p1-n'],
      ['g8', 'g5', 'g7', 'g6', 'p1', 'r1', 'p1-n'],
      ['g8', 'g5', 'g7', 'g7', 'g7', 'g6', 'p1-n'],
      ['g5', 'g7', 'g7', 'g7', 'g7', 'g7', 'g7'],
      ['g8', 'g5', 'g7', 'g7', 'g6', 'p1', 'r1'],
      ['g8', 'g5', 'g7', 'g7', 'g6', 'p1', 'r1'],
      ['g5', 'g7', 'g7', 'g7', 'g7', 'g7', 'g7'],
      ['g8', 'g5', 'g7', 'g6', 'p1', 'r1', 'r1'],
      ['g8', 'g5', 'g7', 'g6', 'p1', 'r1', 'r1'],
      ['g8', 'g5', 'g6', 'p1', 'r1', 'r1', 'p1-n'],
      ['g8', 'g5', 'g6', 'p1', 'p2', 'r1', 'p1-n'],
      ['g8', 'g5', 'g6', 'p1', 'p2', 'r1', 'p1-n'],
      ['g8', 'g5', 'g6', 'p1', 'p2', 'r1', 'p1-n'],
      ['g8', 'g5', 'g7', 'g6', 'p1', 'r1', 'p1-n'],
      ['g10', 'g5', 'g7', 'g7', 'g6', 'p1', 'p1-n'],
      [0, 'g10', 'g7', 'g7', 'g7', 'g7', 'p1-n'],
      [0, 0, 0, 0, 0, 0, 'p1']
    ],
    elements: [
      { name: 'bridge', x: 768, y: 96, blockCount: 4 },
      // { name: 'bridge', x: 31 * this.blockSize, y: 4 * this.blockSize, width: 4 },
    ],
    enemy: [],

    //playerStartPos: { x: 2, y: 2 }
  }],
  spritesInfo: {
    b1: {
      x: 35,
      y: 1,
      w: 96,
      delay: 20
    },
    b2: {
      x: 133,
      y: 1,
      w: 96,
      delay: 20
    },
    b3: {
      x: 1,
      y: 35,
      w: 96,
      delay: 20
    },
    b4: {
      x: 268,
      y: 206,
      w: 32,
    },
    b5: {
      x: 268,
      y: 171,
      w: 32,
    },
    g1: {
      x: 231,
      y: 1,
      w: 32,
    },
    g10: {
      x: 99,
      y: 35,
      w: 32,
    },
    g2: {
      x: 133,
      y: 35,
      w: 32,
    },
    g3: {
      x: 167,
      y: 35,
      w: 32,
    },
    g4: {
      x: 201,
      y: 35,
      w: 32,
    },
    g5: {
      x: 235,
      y: 35,
      w: 32,
    },
    g6: {
      x: 1,
      y: 69,
      w: 32,
    },
    g7: {
      x: 35,
      y: 69,
      w: 32,
    },
    g8: {
      x: 69,
      y: 69,
      w: 32,
    },
    g9: {
      x: 103,
      y: 69,
      w: 32,
    },
    m1: {
      x: 137,
      y: 69,
      w: 32,
    },
    m2: {
      x: 171,
      y: 69,
      w: 32,
    },
    m3: {
      x: 205,
      y: 69,
      w: 32,
    },
    m4: {
      x: 1,
      y: 103,
      w: 32,
    },
    m5: {
      x: 35,
      y: 103,
      w: 32,
    },
    m6: {
      x: 69,
      y: 103,
      w: 32,
    },
    m7: {
      x: 103,
      y: 103,
      w: 32,
    },
    m8: {
      x: 137,
      y: 103,
      w: 32,
    },
    p1: {
      x: 171,
      y: 103,
      w: 32,
    },
    p2: {
      x: 205,
      y: 103,
      w: 32,
    },
    platform: {
      x: 265,
      y: 1,
      w: 1,
    },
    pw1: {
      x: 1,
      y: 137,
      w: 64,
      delay: 20
    },
    pw2: {
      x: 67,
      y: 137,
      w: 64,
      delay: 20
    },
    r1: {
      x: 133,
      y: 137,
      w: 32,
    },
    rw1: {
      x: 167,
      y: 137,
      w: 64,
      delay: 20
    },
    rw11: {
      x: 233,
      y: 137,
      w: 32,
      delay: 20
    },
    rw2: {
      x: 1,
      y: 171,
      w: 64,
      delay: 20
    },
    rw3: {
      x: 67,
      y: 171,
      w: 64,
      delay: 20
    },
    rw4: {
      x: 133,
      y: 171,
      w: 64,
      delay: 20
    },
    s1: {
      x: 199,
      y: 171,
      w: 32,
    },
    s2: {
      x: 233,
      y: 171,
      w: 32,
    },
    s3: {
      x: 1,
      y: 205,
      w: 32,
    },
    w: {
      x: 35,
      y: 205,
      w: 32,
    },
    w1: {
      x: 69,
      y: 205,
      w: 64,
      delay: 20
    },
    w2: {
      x: 135,
      y: 205,
      w: 64,
      delay: 20
    },
    w3: {
      x: 201,
      y: 205,
      w: 64,
      delay: 20
    },
    w4: {
      x: 268,
      y: 1,
      w: 64,
      delay: 20
    },
    w5: {
      x: 269,
      y: 35,
      w: 64,
      delay: 20
    },
    w6: {
      x: 239,
      y: 69,
      w: 64,
      delay: 20
    },
    w7: {
      x: 239,
      y: 103,
      w: 64,
      delay: 20
    },
    w8: {
      x: 267,
      y: 137,
      w: 64,
      delay: 20
    }
  }
}

class Level {
  constructor(number, pjs, contra) {
    this.levelNumber = number;

    this.lastCameraX = 0;
    this.pausePress = false;

    this.bgArray = [];
    this.elementsArray = [];
    this.enemyArray = [];
    this.enemyCreator = [];

    this.platformActual = [];
    this.elementsActual = [];
    this.enemyActual = [];
    this.enemyCreatorActual = [];

    this.bulletsArray = [];
    this.playerBulletsArray = [];

    this.deathPlatform = new Platform(map.blockSize * 9, 2, -map.blockSize * 0.5, map.blockSize * 7 - 2, 'DEATH');
    this.leftBorder = new Platform(2, map.blockSize * 8, -4, -map.blockSize * 0.5, 'LEFTBORDER');
    this.levelBorder = new Platform(map.blockSize * 12, map.blockSize * 11, -map.blockSize * 2, -map.blockSize * 2, 'LEVELBORDER');

    this.platformActual.push(this.deathPlatform);
    this.platformActual.push(this.leftBorder);

    // Create All elements
    let createElement = (from, type) => {
      let bs = map.blockSize;
      let createBG = (bgColumn, i) => {
        for (let j = 0; j < bgColumn.length; j++) {
          if (bgColumn[j] !== 0) {
            let name = bgColumn[j].split('-');
            let canJumpDown = true;
            if (name.length > 1 && name[1] === 'n') {
              canJumpDown = false;
            }
            name[0];
            new Bg(name[0], map.spritesInfo[name[0]], bs, bs, i * bs, j * bs, this, canJumpDown);
          }
        }
      }

      for (let i = 0; i < from.length; i++) {
        switch (type) {
          case 'BG':
            createBG(from[i], i);
            break;
          case 'ENEMY':
            new EnemyCreater(from[i], this);
            break;
          case 'ELEMENT':
            new ElementCreator(from[i], this, pjs.game);
            break;
          default:
            break;
        }
      }
    }

    this.levelSprites = pjs.tiles.newImage(`../src/sprites/levels/${number + 1}/spritesheet.png`)
    this.spritesInfo = map.spritesInfo;
    createElement(map.levels[this.levelNumber].bg, 'BG');
    createElement(map.levels[this.levelNumber].enemy, 'ENEMY');
    createElement(map.levels[this.levelNumber].elements, 'ELEMENT');

    this.startLevel(pjs.game, contra, pjs.keyControl, pjs, this);
  }

  // Проверка сместился ли экран на 32 пикселя. Если да, то добавляем справа новые элементы
  tryRefreshActualElements() {
    if (this.lastCameraX > 32) {
      this.addActualElements();
      this.lastCameraX = this.lastCameraX - 32;
    }
  }

  // Добавление элементов из обычного массива в актуальный. Если его час настал
  addActualElements() {
    let addElements = (from) => {
      for (let i = 0; i < from.length; i++) {
        if (!from[i].tryToActual(this, true)) {
          break;
        }
      }
    }

    //addElements(this.bgArray, 'BG');
    //addElements(this.enemyArray, 'ENEMY');
    addElements(this.elementsArray, 'ELEMENT');
  }

  pause(isPausePress) {
    if (this.pausePress) {
      if (!isPausePress) {
        console.log('pause');
      }
    } else if (isPausePress) {
      this.pausePress = true;
    }
  }

  startLevel(game, contra, keyControl, pjs, level) {
    game.newLoop('myGame', function() {
      //game.clear();
      level.bgArray.forEach(el => {
        el.sprite.draw();
      });
      level.elementsArray.forEach(el => {
        el.sprites.forEach(sp => {
          sp.draw();
        });
      });

      contra.player.calculateMoves(contra, pjs, [
        keyControl.isDown('UP') || keyControl.isDown('W') || joystick.buttons.up,
        keyControl.isDown('RIGHT') || keyControl.isDown('D') || joystick.buttons.right,
        keyControl.isDown('BOTTOM') || keyControl.isDown('S') || joystick.buttons.down,
        keyControl.isDown('LEFT') || keyControl.isDown('A') || joystick.buttons.left,
        keyControl.isDown('P'),
        keyControl.isDown('O'),
        keyControl.isDown('SPACE')
      ]);
      contra.player.spritesMesh.draw()
    })

    game.setLoop('myGame');
  }

}