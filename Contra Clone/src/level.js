/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable no-tabs */
/* eslint-disable no-new */
/* eslint-disable indent */
/* eslint-disable import/named */
/* eslint-disable import/no-cycle */
import Bg from './bg';
import Platform from './platform';
import ElementCreator from './elements/elementCreator';
import EnemyCreator from './enemy/enemyCreator';
import Sound from './sound';

import contra from './index';

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
      [0, 0, 0, 0, 0, 0, 'p1'],
    ],
    elements: [{
        name: 'bridge',
        x: 768,
        y: 96,
        blockCount: 4,
      },
      {
        name: 'bridge',
        x: 1056,
        y: 96,
        blockCount: 4,
      },

      { name: 'tankInRock', x: 632, y: 80 },
      { name: 'tankInRock', x: 825, y: 64 },
      { name: 'tankInRock', x: 825, y: 64 },
      { name: 'tankInRock', x: 1560, y: 96 },
      { name: 'tankInRock', x: 1624, y: 96 },
    ],
  }],
  spritesInfo: {
    b1: {
      x: 35,
      y: 1,
      w: 96,
      h: 32,
      frames: 3,
      delay: 20,
    },
    b2: {
      x: 133,
      y: 1,
      w: 96,
      h: 32,
      frames: 3,
      delay: 20,
    },
    b3: {
      x: 1,
      y: 35,
      w: 96,
      h: 32,
      frames: 3,
      delay: 20,
    },
    b4: {
      x: 268,
      y: 206,
      w: 32,
      h: 32,
    },
    b5: {
      x: 268,
      y: 171,
      w: 32,
      h: 32,
    },
    g1: {
      x: 231,
      y: 1,
      w: 32,
      h: 32,
    },
    g10: {
      x: 99,
      y: 35,
      w: 32,
      h: 32,
    },
    g2: {
      x: 133,
      y: 35,
      w: 32,
      h: 32,
    },
    g3: {
      x: 167,
      y: 35,
      w: 32,
      h: 32,
    },
    g4: {
      x: 201,
      y: 35,
      w: 32,
      h: 32,
    },
    g5: {
      x: 235,
      y: 35,
      w: 32,
      h: 32,
    },
    g6: {
      x: 1,
      y: 69,
      w: 32,
      h: 32,
    },
    g7: {
      x: 35,
      y: 69,
      w: 32,
      h: 32,
    },
    g8: {
      x: 69,
      y: 69,
      w: 32,
      h: 32,
    },
    g9: {
      x: 103,
      y: 69,
      w: 32,
      h: 32,
    },
    m1: {
      x: 137,
      y: 69,
      w: 32,
      h: 32,
    },
    m2: {
      x: 171,
      y: 69,
      w: 32,
      h: 32,
    },
    m3: {
      x: 205,
      y: 69,
      w: 32,
      h: 32,
    },
    m4: {
      x: 1,
      y: 103,
      w: 32,
      h: 32,
    },
    m5: {
      x: 35,
      y: 103,
      w: 32,
      h: 32,
    },
    m6: {
      x: 69,
      y: 103,
      w: 32,
      h: 32,
    },
    m7: {
      x: 103,
      y: 103,
      w: 32,
      h: 32,
    },
    m8: {
      x: 137,
      y: 103,
      w: 32,
      h: 32,
    },
    p1: {
      x: 171,
      y: 103,
      w: 32,
      h: 32,
    },
    p2: {
      x: 205,
      y: 103,
      w: 32,
      h: 32,
    },
    platform: {
      x: 265,
      y: 1,
      w: 1,
      h: 32,
    },
    pw1: {
      x: 1,
      y: 137,
      w: 64,
      h: 32,
      frames: 2,
      delay: 20,
    },
    pw2: {
      x: 67,
      y: 137,
      w: 64,
      h: 32,
      frames: 2,
      delay: 20,
    },
    r1: {
      x: 133,
      y: 137,
      w: 32,
      h: 32,
    },
    rw1: {
      x: 167,
      y: 137,
      w: 64,
      h: 32,
      frames: 2,
      delay: 20,
    },
    rw11: {
      x: 233,
      y: 137,
      w: 32,
      h: 32,
      frames: 2,
      delay: 20,
    },
    rw2: {
      x: 1,
      y: 171,
      w: 64,
      h: 32,
      frames: 2,
      delay: 20,
    },
    rw3: {
      x: 67,
      y: 171,
      w: 64,
      h: 32,
      frames: 2,
      delay: 20,
    },
    rw4: {
      x: 133,
      y: 171,
      w: 64,
      h: 32,
      frames: 2,
      delay: 20,
    },
    s1: {
      x: 199,
      y: 171,
      w: 32,
      h: 32,
    },
    s2: {
      x: 233,
      y: 171,
      w: 32,
      h: 32,
    },
    s3: {
      x: 1,
      y: 205,
      w: 32,
      h: 32,
    },
    w: {
      x: 35,
      y: 205,
      w: 32,
      h: 32,
    },
    w1: {
      x: 69,
      y: 205,
      w: 64,
      h: 32,
      frames: 2,
      delay: 20,
    },
    w2: {
      x: 135,
      y: 205,
      w: 64,
      h: 32,
      frames: 2,
      delay: 20,
    },
    w3: {
      x: 201,
      y: 205,
      w: 64,
      h: 32,
      frames: 2,
      delay: 20,
    },
    w4: {
      x: 268,
      y: 1,
      w: 64,
      h: 32,
      frames: 2,
      delay: 20,
    },
    w5: {
      x: 269,
      y: 35,
      w: 64,
      h: 32,
      frames: 2,
      delay: 20,
    },
    w6: {
      x: 239,
      y: 69,
      w: 64,
      h: 32,
      frames: 2,
      delay: 20,
    },
    w7: {
      x: 239,
      y: 103,
      w: 64,
      h: 32,
      frames: 2,
      delay: 20,
    },
    w8: {
      x: 267,
      y: 137,
      w: 64,
      h: 32,
      frames: 2,
      delay: 20,
    },
  },
  elementsInfo: {
    bigBoom: {
      x: 1,
      y: 1,
      w: 128,
      h: 32,
      frames: 4,
      delay: 10,
    },
    bonusB: {
      x: 131,
      y: 1,
      w: 24,
      h: 15,
      frames: 1,
    },
    bonusF: {
      x: 157,
      y: 1,
      w: 24,
      h: 15,
      frames: 1,
    },
    bonusL: {
      x: 183,
      y: 1,
      w: 24,
      h: 15,
      frames: 1,
    },
    bonusM: {
      x: 209,
      y: 1,
      w: 24,
      h: 15,
      frames: 1,
    },
    bonusR: {
      x: 235,
      y: 1,
      w: 24,
      h: 15,
      frames: 1,
    },
    bonusS: {
      x: 261,
      y: 1,
      w: 24,
      h: 15,
      frames: 1,
    },
    enemyDeath: {
      x: 287,
      y: 1,
      w: 96,
      h: 32,
      frames: 3,
    },
    flyBonus: {
      x: 385,
      y: 1,
      w: 24,
      h: 14,
      frames: 1,
    },
    mediumBoom: {
      x: 411,
      y: 1,
      w: 96,
      h: 32,
      frames: 3,
      delay: 10,
    },
    platform: {
      x: 509,
      y: 1,
      w: 1,
      h: 1,
      frames: 1,
    },
    shoot: {
      x: 512,
      y: 1,
      w: 3,
      h: 3,
      frames: 1,
    },
    shootEnd: {
      x: 517,
      y: 1,
      w: 7,
      h: 7,
      frames: 1,
    },
    shootF: {
      x: 526,
      y: 1,
      w: 9,
      h: 8,
      frames: 1,
    },
    shootL: {
      x: 519,
      y: 27,
      w: 45,
      h: 6,
      frames: 1,
    },
    shootS: {
      x: 131,
      y: 23,
      w: 90,
      h: 8,
      frames: 9,
      delay: 10,
    },
    shootM1: {
      x: 555,
      y: 1,
      w: 8,
      h: 8,
      frames: 1,
    },
    shootM2: {
      x: 565,
      y: 1,
      w: 6,
      h: 6,
      frames: 1,
    },
    shootM: {
      x: 573,
      y: 1,
      w: 5,
      h: 5,
      frames: 1,
    },
  },
  enemiesInfo: {
    firstBossShoot: {
      x: 1,
      y: 1,
      w: 50,
      h: 24,
      frames: 2,
      delay: 10,
    },
    bonusR: {
      x: 53,
      y: 1,
      w: 134,
      h: 32,
      frames: 4,
      delay: 10,
    },
    bonusRClose: {
      x: 189,
      y: 1,
      w: 32,
      h: 32,
    },
    bonusROpen: {
      x: 1,
      y: 35,
      w: 100,
      h: 32,
      frames: 3,
      delay: 10,
    },
    kokon: {
      x: 223,
      y: 1,
      w: 64,
      h: 14,
      frames: 2,
      delay: 10,
    },
    kokonDie: {
      x: 223,
      y: 17,
      w: 32,
      h: 14,
    },
    lichinka: {
      x: 257,
      y: 17,
      w: 16,
      h: 16,
    },
    rot: {
      x: 103,
      y: 35,
      w: 66,
      h: 32,
      frames: 2,
      delay: 10,
    },
    rotShot: {
      x: 171,
      y: 35,
      w: 34,
      h: 16,
      frames: 2,
      delay: 10,
    },
    sniper315: {
      x: 275,
      y: 17,
      w: 24,
      h: 31,
    },
    sniper0: {
      x: 207,
      y: 50,
      w: 24,
      h: 32,
    },
    sniper0Shot: {
      x: 233,
      y: 50,
      w: 24,
      h: 32,
    },
    sniper45: {
      x: 259,
      y: 50,
      w: 18,
      h: 39,
    },
    sniper45Shot: {
      x: 279,
      y: 50,
      w: 18,
      h: 39,
    },
    sniperHead: {
      x: 289,
      y: 1,
      w: 8,
      h: 7,
    },
    sniperUp: {
      x: 208,
      y: 277,
      w: 78,
      h: 16,
      frames: 3,
      delay: 10,
    },
    sniperDown: {
      x: 287,
      y: 277,
      w: 78,
      h: 16,
      frames: 3,
      delay: 10,
    },
    spider: {
      x: 52,
      y: 91,
      w: 126,
      h: 32,
    },
    tankR240: {
      x: 180,
      y: 91,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankR190: {
      x: 1,
      y: 125,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankR330: {
      x: 103,
      y: 125,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankR300: {
      x: 1,
      y: 159,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankR270: {
      x: 103,
      y: 159,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankR0: {
      x: 1,
      y: 193,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankR120: {
      x: 103,
      y: 193,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankR150: {
      x: 1,
      y: 227,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankR180: {
      x: 103,
      y: 227,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankR30: {
      x: 1,
      y: 261,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankR60: {
      x: 103,
      y: 261,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankR90: {
      x: 301,
      y: 1,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankRB: {
      x: 301,
      y: 35,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankRB30: {
      x: 299,
      y: 69,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankRB60: {
      x: 282,
      y: 103,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankRClose: {
      x: 205,
      y: 137,
      w: 34,
      h: 32,
      frames: 4,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankROpen: {
      x: 205,
      y: 171,
      w: 34,
      h: 32,
      frames: 4,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankRBOpen: {
      x: 204,
      y: 243,
      w: 34,
      h: 32,
      frames: 4,
      delay: 10,
    },
    vorJump: {
      x: 384,
      y: 103,
      w: 16,
      h: 28,
    },
    vorLie: {
      x: 1,
      y: 69,
      w: 32,
      h: 14,
    },
    vorRun: {
      x: 205,
      y: 205,
      w: 106,
      h: 32,
      frames: 6,
      delay: 10,
    },
    vorShot: {
      x: 341,
      y: 137,
      w: 50,
      h: 32,
      frames: 2,
      delay: 10,
    },
  },
};
export default class Level {
  constructor(number) {
    this.levelNumber = number;

    this.lastCameraX = 0;
    this.pausePress = false;
    this.bgArray = [];
    this.elementsArray = [];
    this.enemyArray = [];

    this.platformActual = [];
    this.elementsActual = [];

    this.bulletsArray = [];
    this.playerBulletsArray = [];

    this.deathPlatform = new Platform(map.blockSize * 9, 2, -map.blockSize * 0.5, map.blockSize * 7 - 2, 'DEATH', false);
    this.leftBorder = new Platform(2, map.blockSize * 8, -4, -map.blockSize * 0.5, 'LEFTBORDER', false);
    this.levelBorder = new Platform(map.blockSize * 12, map.blockSize * 11, -map.blockSize * 2, -map.blockSize * 2, 'LEVELBORDER', false);

    this.platformActual.push(this.deathPlatform);
    this.platformActual.push(this.leftBorder);

    Sound.playMusic(1);

    // Create All elements
    const createElement = (from, type) => {
      const bs = map.blockSize;
      const createBG = (bgColumn, i) => {
        for (let j = 0; j < bgColumn.length; j += 1) {
          if (bgColumn[j] !== 0) {
            const name = bgColumn[j].split('-');
            let canJumpDown = true;
            if (name.length > 1 && name[1] === 'n') {
              canJumpDown = false;
            }
            new Bg(name[0], this.spritesInfo[name[0]], bs, bs, i * bs, j * bs, this, canJumpDown);
          }
        }
      };

      for (let i = 0; i < from.length; i += 1) {
        switch (type) {
          case 'BG':
            createBG(from[i], i);
            break;
          case 'ELEMENT':
            new ElementCreator(from[i], this);
            break;
          default:
            break;
        }
      }
    };

    this.spritesInfo = map.spritesInfo;
    this.elementsInfo = map.elementsInfo;
    this.enemiesInfo = map.enemiesInfo;

    createElement(map.levels[this.levelNumber].bg, 'BG');
    // createElement(map.levels[this.levelNumber].enemy, 'ENEMY');
    createElement(map.levels[this.levelNumber].elements, 'ELEMENT');

    this.startLevel(this);
  }

  // Проверка сместился ли экран на 32 пикселя. Если да, то добавляем справа новые элементы
  tryRefreshActualElements() {
    if (this.lastCameraX > 32) {
      this.addActualElements();
      this.lastCameraX -= 32;
    }
  }

  // Добавление элементов из обычного массива в актуальный. Если его час настал
  addActualElements() {
    const addElements = (from) => {
      for (let i = 0; i < from.length; i += 1) {
        if (!from[i].tryToActual(this, true)) {
          break;
        }
      }
    };

    // addElements(this.bgArray, 'BG');
    // addElements(this.enemyArray, 'ENEMY');
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

  startLevel(level) {
    const { pjs } = contra;
    const { isDown } = pjs.keyControl;

    pjs.game.newLoop('myGame', () => {
      // game.clear();

      // draw Sprites
      level.bgArray.forEach((el) => {
        el.sprite.draw();
      });

      // check elements to draw
      level.elementsArray.forEach((el) => {
        el.isTimeToShow();
      });

      // draw elements
      level.elementsActual.forEach((el) => {
        el.tryAction();
        el.getSprites().forEach((sp) => {
          try {
            sp.draw();
          } catch (error) {
            console.log('error');
          }
        });
      });

      //draw enemy
      level.enemyArray.forEach((el) => {
        el.spritesMesh.draw();
        //  el.selectedState.sprite.drawStaticBox()
      });

      level.bulletsArray.forEach((el) => {
        el.draw();
      });

      level.playerBulletsArray.forEach((el) => {
        el.draw(level, level.playerBulletsArray);
      });

      /*
			level.platformActual.forEach(el => {
				el.sprite.drawStaticBox();
			}); */
      const getKey = contra.options.options;
      contra.player.calculateMoves([
        isDown(getKey.keyUp),
        isDown(getKey.keyRight),
        isDown(getKey.keyDown),
        isDown(getKey.keyLeft),
        isDown(getKey.keyJump),
        isDown(getKey.keyFire),
        isDown('SPACE'),
      ]);
      contra.player.spritesMesh.draw();
      // contra.player.states['swim_top'].sprite.visible = true;
      //  contra.player.states['swim_top'].sprite.draw();
    });

    pjs.game.setLoop('myGame');
  }
}
