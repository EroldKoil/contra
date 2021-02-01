/* eslint-disable */

import Bg from './bg';
import Platform from './platform';
import elementCreator from './elements/elementCreator';
/*import Bridge from './elements/bridge';
import BonusRock from './elements/bonusRock';
import BonusFly from './elements/bonusFly';
import EnemyCreator from './enemy/enemyCreator';
import TankInRock from './enemy/tankInRock';
import TankBottom from './enemy/tankBottom';
import Sniper from './enemy/sniper';
import ToothyMouth from './enemy/toothyMouth';
import SpiderCocoon from './enemy/spiderCocoon';
import Boss1 from './boss/boss1';
import Boss81 from './boss/boss81';
import Boss82 from './boss/boss82';*/


// import EnemyCreator from './enemy/enemyCreator';
import Sound from './sound';
import Сurtain from './elements/curtain';

import contra from './index';

const map = {
  blockSize: 32,
  levels: [{
      length: 3071, //3071, // 250
      bg: [
        ['s1', 's2', 0, 0, 'w', 'w1', 'w'],
        ['s2', 0, 'g1', 'p1', 'r1', 'rw1', 'w'],
        ['s1', 0, 'g2', 'p1', 'r1', 'rw1', 'w'],
        ['m1', 'm2', 'g2', 'p1', 'r1', 'rw1', 'w'],
        ['m3', 'm4', 'g2', 'p1', 'r1', 'rw4', 'w2'],
        ['m5', 'm6', 'g2', 'p1', 'p1', 'r1', 'w3'],
        ['m3', 'm4', 'g2', 'p1', 'p1', 'r1', 'w3'], //
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
        ['g8', 'g5', 'g7', 'g6', 'p1', 'r1', 'r1'], //
        ['g8', 'g5', 'g6', 'p1', 'r1', 'r1', 'p1-n'],
        ['g8', 'g5', 'g6', 'p1', 'p2', 'r1', 'p1-n'],
        ['g8', 'g5', 'g6', 'p1', 'p2', 'r1', 'p1-n'],
        ['g8', 'g5', 'g6', 'p1', 'p2', 'r1', 'p1-n'],
        ['g8', 'g5', 'g7', 'g6', 'p1', 'r1', 'p1-n'],
        ['g10', 'g5', 'g7', 'g7', 'g6', 'p1', 'p1-n'],
        [0, 'g10', 'g7', 'g7', 'g7', 'g7', 'p1-n'],
        [0, 0, 0, 0, 0, 0, 'p1'],
      ],
      elements: [

        { name: 'bonusRock', x: 336, y: 160, type: 'M' },
        { name: 'bonusRock', x: 1584, y: 160, type: 'F' },
        { name: 'bonusRock', x: 2288, y: 190, type: 'S' },

        { name: 'bonusFly', x: 220, y: 75, type: 'R' },
        { name: 'bonusFly', x: 1120, y: 75, type: 'S' },
        { name: 'bonusFly', x: 2324, y: 60, type: 'R' },
        { name: 'bonusFly', x: 2324, y: 180, type: 'L' },

        { name: 'sniper', x: 317, y: 198, type: 'STAY' },
        { name: 'sniper', x: 639, y: 198, type: 'STAY' },
        { name: 'sniper', x: 1279, y: 102, type: 'STAY' },
        { name: 'sniper', x: 1347, y: 89, type: 'HALF' },
        { name: 'sniper', x: 1554, y: 56, type: 'HALF' },
        { name: 'sniper', x: 2360, y: 134, type: 'STAY' },


        { name: 'tankBottom', x: 2065, y: 160 },
        { name: 'tankBottom', x: 2192, y: 64 },
        { name: 'tankBottom', x: 2769, y: 128 },
        { name: 'tankInRock', x: 1264, y: 160 },
        { name: 'tankInRock', x: 1650, y: 128 },
        { name: 'tankInRock', x: 1841, y: 128 },
        { name: 'tankInRock', x: 2993, y: 192 },
        { name: 'tankInRock', x: 3121, y: 192 },
        { name: 'bridge', x: 768, y: 96, blockCount: 4 },
        { name: 'bridge', x: 1056, y: 96, blockCount: 4 },

        { name: 'boss1', x: 3216, y: 41 },

        {
          name: 'enemyCreator',
          type: 'thief',
          coords: [
            { xS: 150, xE: 1114, y: 95, vector: -1, reloading: 3000 },
            { xS: 1115, xE: 1664, y: 126, vector: -1, reloading: 3000 },
            { xS: 1665, xE: 2304, y: 137, vector: -1, reloading: 3000 },
            { xS: 2305, xE: 2650, y: 124, vector: -1, reloading: 3000 },
          ]

        }
      ],
    },
    {
      length: 3072, // 3328
      bg: [],
      elements: [{
          name: 'background',
          img: 2,
          platforms: [
            // пол
            { x: 0, y: 198, w: 1071, h: 1, collision: 'BOTTOM' },
            { x: 1126, y: 198, w: 1001, h: 1, collision: 'BOTTOM' },
            { x: 2182, y: 198, w: 345, h: 1, collision: 'BOTTOM' },
            { x: 2598, y: 198, w: 181, h: 1, collision: 'BOTTOM' },

            // конец ступенек
            { x: 526, y: 103, w: 2, h: 96, collision: 'VERTICAL' },
            // столбы
            { x: 1368, y: 0, w: 40, h: 156, collision: 'VERTICAL' },
            { x: 1464, y: 54, w: 40, h: 156, collision: 'VERTICAL' },
            { x: 1408, y: 150, w: 56, h: 1, collision: 'BOTTOM', canFallDown: true },
            { x: 1408, y: 102, w: 56, h: 1, collision: 'BOTTOM', canFallDown: true },
            { x: 1408, y: 54, w: 96, h: 1, collision: 'BOTTOM', canFallDown: true },

            { x: 1528, y: 0, w: 40, h: 124, collision: 'VERTICAL' },
            { x: 1624, y: 70, w: 40, h: 137, collision: 'VERTICAL' },
            { x: 1568, y: 118, w: 56, h: 1, collision: 'BOTTOM', canFallDown: true },
            { x: 1568, y: 70, w: 96, h: 1, collision: 'BOTTOM', canFallDown: true },


            { x: 1784, y: 54, w: 40, h: 158, collision: 'VERTICAL' },
            { x: 1880, y: 0, w: 40, h: 124, collision: 'VERTICAL' },
            { x: 1759, y: 150, w: 25, h: 1, collision: 'BOTTOM', canFallDown: true },
            { x: 1759, y: 102, w: 25, h: 1, collision: 'BOTTOM', canFallDown: true },
            { x: 1728, y: 54, w: 96, h: 1, collision: 'BOTTOM', canFallDown: true },
            { x: 1824, y: 70, w: 56, h: 1, collision: 'BOTTOM', canFallDown: true },
            { x: 1824, y: 118, w: 56, h: 1, collision: 'BOTTOM', canFallDown: true },

            { x: 1368, y: 158, w: 40, h: 2, collision: 'ROOF' },
            { x: 1528, y: 126, w: 40, h: 2, collision: 'ROOF' },
            { x: 1880, y: 126, w: 40, h: 2, collision: 'ROOF' },
          ],
          paddons: [
            // ступеньки
            { x: 272, y: 166, w: 48, length: '1', needVertical: true, cantFallDown: true },
            { x: 304, y: 134, w: 48, length: '1', needVertical: true, cantFallDown: true },
            { x: 336, y: 102, w: 192, length: '5', needVertical: true, cantFallDown: true },

            { x: 576, y: 102, length: '6', needVertical: false },
            { x: 864, y: 102, length: '5', needVertical: false },
            { x: 1104, y: 102, length: '5', needVertical: false },
            { x: 688, y: 150, length: '3', needVertical: false },
            { x: 848, y: 150, length: '3', needVertical: false },
            { x: 1200, y: 150, length: '2', needVertical: false },

            { x: 1584, y: 166, w: 48, length: '1', needVertical: true, cantFallDown: true },
            { x: 1824, y: 166, w: 48, length: '1', needVertical: true, cantFallDown: true, back: true },

            { x: 2000, y: 102, length: '7', needVertical: false },
            { x: 2304, y: 102, length: '3', needVertical: false },
            { x: 2480, y: 102, length: '4', needVertical: false },

            { x: 1968, y: 150, length: '2', needVertical: false },
            { x: 2288, y: 150, length: '8', needVertical: false },

            { x: 2672, y: 166, length: '19', needVertical: true },
          ]
        },
        { name: 'bonusRock', x: 432, y: 161, type: 'M' },
        { name: 'bonusRock', x: 1072, y: 161, type: 'L' },
        { name: 'bonusRock', x: 1682, y: 161, type: 'B' },

        { name: 'bonusFly', x: 220, y: 180, type: 'B' },
        { name: 'bonusFly', x: 990, y: 180, type: 'S' },

        { name: 'sniper', x: 459, y: 100, type: 'STAY' },
        { name: 'sniper', x: 912, y: 149, type: 'STAY' },
        { name: 'sniper', x: 1736, y: 53, type: 'STAY' },

        { name: 'turel', x: 619, y: 101 },
        { name: 'turel', x: 744, y: 101 },
        { name: 'turel', x: 731, y: 197 },
        { name: 'turel', x: 906, y: 197 },
        { name: 'turel', x: 1227, y: 148 },
        { name: 'turel', x: 1237, y: 197 },
        { name: 'turel', x: 2091, y: 101 },
        { name: 'turel', x: 2376, y: 148 },
        { name: 'turel', x: 2378, y: 197 },
        { name: 'turel', x: 2506, y: 148 },

      ],
    },
    {
      length: 2559, // 2559, //2559,
      bg: [
        [0, 0, 0, 0, 0, 0, 'p22-n'],
        [0, 0, 0, 0, 0, 0, 'p22-n'],
        [0, 'd6', 'd7', 'd7', 'd7', 'd8', 'p22-n'],
        ['d6', 'd1', 'd1', 'd1', 'd12', 'd9', 'p22-n'],
        ['d2', 'd1', 'd1', 'd1', 'p7-n', 'a1-v', 'a1'],
        ['d2', 'd1', 'd28', 'd9', 'p23-n', 'a1', 'a1'],
        ['d2', 'd1', 'd3', 'p4', 'p6-n', 'a1', 'a1'],
        ['d2', 'd1', 'd3', 'p5', 'p11-n', 'a1-v', 'a1-v'],
        ['d2', 'd1', 'd18', 'd7', 'd8', 0, 'k1'],
        ['d2', 'd1', 'd22', 'p12', 'd29', 'p9-n', 'a1-v'],
        ['d2', 'd1', 'd3', 'p22', 'd23', 'd8', 'k1'],
        ['d2', 'd1', 'd3', 'p22', 'd23', 'p10-n', 'k2'],
        ['d2', 'd1', 'd3', 'p22', 'd23', 'p14-n', 'k3'],
        ['d2', 'd1', 'd3', 'p22', 'p15-n', 'd30', 'k2'],
        ['d2', 'd1', 'd3', 'p5', 'p6-n', 'a1', 'a1'],
        ['d2', 'd1', 'd18', 'd7', 'p3-n', 'a1', 'a1'],
        ['d2', 'd1', 'd1', 'd1', 'p8-n', 'a1-v', 'a1'],
        ['d2', 'd1', 'd1', 'd1', 'd8', 'p23-n', 'a1'],
        ['d11', 'd12', 'd12', 'd20', 'd12', 'p23-n', 'a1'],
        [0, 0, 0, 0, 0, 'p23-n', 'a1'],
        [0, 0, 0, 0, 0, 'p23-n', 'a1'],
        ['c1', 0, 0, 0, 0, 'p23-n', 'a1'],
        ['c2', 0, 0, 'd6', 'd7', 'p3-n', 'a1'],
        ['c3', 'c4', 'd6', 'd1', 'd1', 'p3-n', 'a1'],
        ['a1', 'd6', 'd1', 'd1', 'd1', 'p8-n', 'a1-v'],
        ['a1', 'd2', 'd1', 'd1', 'd1', 'd18', 'k1'],
        ['a1', 'd14', 'd20', 'd1', 'd1', 'd22', 'k4-n'],
        ['a1', 'd17', 'd13', 'd21', 'd1', 'd3', 'p22-n'],
        ['a1', 'd4', 'd6', 'd1', 'd1', 'd3', 'p22-n'],
        ['a1', 'a3', 'd2', 'd1', 'd1', 'd3', 'p22-n'],
        ['a1', 'a3', 'd11', 'd1', 'd1', 'd3', 'p22-n'],
        ['a1', 'a1', 'd4', 'd19', 'd1', 'd3', 'p22-n'],
        ['a1', 'a1', 'a3', 'd2', 'd1', 'd9', 'p22-n'],
        ['a1', 'a1', 'a3', 'd2', 'd1', 'p9-n', 'a1-v'],
        ['a1', 'a1', 'a1', 'd2', 'd22', 0, 'k1'],
        ['a1', 'a1', 'a1', 'd11', 'd3', 'p17-n', 'a1-v'],
        ['a1', 'a1', 'a1', 'd13', 'd21', 'd8', 'k1'],
        ['a1', 'a1', 'a1', 'd15', 'd1', 'p10-n', 'k2'],
        ['a1', 'a1', 'a3', 'd6', 'd1', 'p3-n', 'a1'],
        ['a1', 'a1', 'a3', 'd2', 'd1', 'p8-n', 'a1-v'],
        ['a1', 'a1', 'd5', 'd34', 'p12', 'd35', 'p4-n'],
        ['a1', 'a1', 'd15', 'd3', 'p22', 'd24', 'p22-n'],
        ['a1', 'a1', 'd13', 'd26', 'p22', 'd24', 'p22-n'],
        ['a1', 'd5', 'd6', 'd3', 'p22', 'd24', 'p22-n'],
        ['a1', 'd15', 'd1', 'd3', 'p22', 'd24', 'p5-n'],
        ['a1', 'd10', 'd20', 'd3', 'p22', 'p18-n', 'a1-v'],
        ['a1', 'd17', 'd13', 'd26', 'p5', 'p6-n', 'a3'],
        ['a1', 'd16', 'd6', 'd18', 'd7', 'p3-n', 'a3'],
        ['a1', 'd6', 'd1', 'd1', 'd1', 'p3-n', 'a3'],
        ['a1', 'd14', 'd19', 'd22', 'p12', 'p19-n', 'a1'],
        ['a1', 'd13', 'd21', 'd3', 'p22', 'p6-n', 'a1'],
        ['a1', 'd6', 'd12', 'd9', 'p22', 'p11-n', 'a1-v'],
        ['a1', 'd2', 'p7', 'a1', 'p22', 'd24', 'p4-n'],
        ['a1', 'd2', 'p3', 'a1', 'p5', 'd24', 'p22-n'],
        ['a1', 'd2', 'p3', 'a3', 'd6', 'd8', 'p22-n'],
        ['a1', 'd2', 'p8', 'a3', 'd2', 'd3', 'p5-n'],
        ['a1', 'd2', 'd18', 'd7', 'd27', 'd9', 'k1'],
        ['a1', 'd2', 'p10', 'd30', 'd19', 'p7-n', 'a1-v'],
        ['a1', 'd2', 'p3', 'a1', 'd2', 'p3-n', 'a1'],
        ['a1', 'd2', 'p3', 'a1', 'd2', 'p3-n', 'a3'],
        ['a1', 'd2', 'p3', 'a1', 'd10', 'p3-n', 'a3'],
        ['a1', 'd2', 'p3', 'a1', 'd13', 'p21-n', 'k3'],
        ['a1', 'd2', 'p3', 'a1', 'd15', 'd22', 'k1'],
        ['a1', 'd2', 'p3', 'a3', 'd6', 'd3', 'p4-n'],
        ['a1', 'd2', 'p3', 'a3', 'd2', 'd3', 'p22-n'],
        ['a1', 'd2', 'p8', 'a1', 'd2', 'd3', 'k6-n'],
        ['a1', 'd11', 'd18', 'd7', 'd27', 'd9', 'k1'],
        ['a1', 'd4', 'd11', 'd1', 'd1', 'p7-n', 'a1-v'],
        ['a1', 'a1', 'd4', 'd19', 'd1', 'p3-n', 'a1'],
        ['a1', 'a1', 'a1', 'd14', 'd1', 'p3-n', 'a3'],
        ['a1', 'a1', 'a1', 'd13', 'd19', 'p3-n', 'a3'],
        ['a1', 'a1', 'a1', 0, 'd10', 'p23-n', 'a1'],
        ['a1', 'a1', 'a1', 0, 0, 'p23-n', 'a1'],
        ['a1', 'a1', 'a3', 0, 0, 'p23-n', 'a1'],
        ['a1', 'a1', 'a3', 0, 0, 'p23-n', 'a1'],
        ['a1', 'a1', 'd5', 0, 0, 'p23-n', 'a1'],
        ['a1', 'd5', 0, 0, 0, 'p23-n', 'a1'],
        ['a1', 0, 0, 0, 0, 'p23-n', 'a1'],
        ['a1-r', 'd16', 0, 0, 0, 'p23-n', 'a1'],
        ['a1-r', 'd17', 'd13', 0, 0, 'p23-n', 'a1'],
        ['a2-r', 'd16', 0, 0, 0, 'p23-n', 'a2'],
        ['a2-r', 0, 0, 0, 0, 'p23-n', 'a3'],
        ['a2-r', 0, 0, 0, 0, 'p23-n', 'a2'],
        ['a2-r', 0, 0, 0, 0, 'p23-n', 'a2'],
        ['a2-r', 0, 0, 0, 0, 'p23-n', 'a2'],
        ['a2-r', 0, 0, 0, 0, 'p23-n', 'a2'],
        ['a2-r', 0, 0, 0, 0, 'p23-n', 'a2'],
        ['a2', 'a2', 'a2', 'a2', 'a2', 'a2-n', 'a2'],
      ],
      elements: [
        { name: 'bonusFly', x: 220, y: 75, type: 'M' },
        { name: 'bonusFly', x: 220, y: 180, type: 'B' },
        { name: 'bonusFly', x: 990, y: 180, type: 'S' },
        { name: 'boss81', x: 647, y: 0 },
        { name: 'toothyMouth', x: 944, y: 64 },
        { name: 'toothyMouth', x: 976, y: 64 },
        { name: 'toothyMouth', x: 1040, y: 96 },
        { name: 'toothyMouth', x: 1072, y: 96 },
        { name: 'toothyMouth', x: 1232, y: 96 },
        { name: 'toothyMouth', x: 1264, y: 96 },
        { name: 'toothyMouth', x: 1488, y: 223 },
        { name: 'toothyMouth', x: 1520, y: 223 },
        { name: 'toothyMouth', x: 1552, y: 223 },
        { name: 'toothyMouth', x: 1744, y: 128 },
        { name: 'toothyMouth', x: 1776, y: 128 },
        { name: 'toothyMouth', x: 1904, y: 223 },
        { name: 'toothyMouth', x: 1936, y: 223 },
        { name: 'toothyMouth', x: 2032, y: 128 },
        { name: 'toothyMouth', x: 2064, y: 128 },
        { name: 'toothyMouth', x: 2224, y: 223 },
        { name: 'toothyMouth', x: 2256, y: 223 },
        { name: 'toothyMouth', x: 2352, y: 96 },
        { name: 'toothyMouth', x: 2384, y: 96 },
        { name: 'toothyMouth', x: 2608, y: 223 },

        { name: 'boss82', x: 2696, y: 33 },
        { name: 'spiderCocoon', x: 2736, y: 47, flip: 1 },
        { name: 'spiderCocoon', x: 2768, y: 47, flip: 1 },
        { name: 'spiderCocoon', x: 2736, y: 175, flip: 0 },
        { name: 'spiderCocoon', x: 2768, y: 175, flip: 0 },

        /* { name: 'boss82', x: 200, y: 33 },
         { name: 'spiderCocoon', x: 224, y: 47, flip: 1 },
         { name: 'spiderCocoon', x: 256, y: 47, flip: 1 },
         { name: 'spiderCocoon', x: 224, y: 175, flip: 0 },
         { name: 'spiderCocoon', x: 256, y: 175, flip: 0 },*/
      ],
    },

  ],
  spritesInfo: {
    b1: { x: 35, y: 1, w: 32, h: 32, frames: 3, delay: 20, },
    b2: { x: 133, y: 1, w: 32, h: 32, frames: 3, delay: 20, },
    b3: { x: 1, y: 35, w: 32, h: 32, frames: 3, delay: 20, },
    b4: { x: 268, y: 206, w: 32, h: 32, },
    b5: { x: 301, y: 205, w: 32, h: 32, },
    g1: { x: 231, y: 1, w: 32, h: 32, },
    g10: { x: 99, y: 35, w: 32, h: 32, },
    g2: { x: 133, y: 35, w: 32, h: 32, },
    g3: { x: 167, y: 35, w: 32, h: 32, },
    g4: { x: 201, y: 35, w: 32, h: 32, },
    g5: { x: 235, y: 35, w: 32, h: 32, },
    g6: { x: 1, y: 69, w: 32, h: 32, },
    g7: { x: 35, y: 69, w: 32, h: 32, },
    g8: { x: 69, y: 69, w: 32, h: 32, },
    g9: { x: 103, y: 69, w: 32, h: 32, },
    m1: { x: 66, y: 238, w: 32, h: 32, frames: 2, delay: 40, },
    m2: { x: 171, y: 69, w: 32, h: 32, },
    m3: { x: 132, y: 238, w: 32, h: 32, frames: 2, delay: 40, },
    m4: { x: 1, y: 103, w: 32, h: 32, },
    m5: { x: 1, y: 238, w: 32, h: 32, frames: 2, delay: 40, },
    m6: { x: 69, y: 103, w: 32, h: 32, },
    m7: { x: 198, y: 238, w: 32, h: 32, frames: 2, delay: 40, },
    m8: { x: 137, y: 103, w: 32, h: 32, },
    p1: { x: 171, y: 103, w: 32, h: 32, },
    p2: { x: 205, y: 103, w: 32, h: 32, },
    pw1: { x: 1, y: 137, w: 32, h: 32, frames: 2, delay: 20, },
    pw2: { x: 67, y: 137, w: 32, h: 32, frames: 2, delay: 20, },
    r1: { x: 133, y: 137, w: 32, h: 32, },
    rw1: { x: 167, y: 137, w: 32, h: 32, frames: 2, delay: 20, },
    rw11: { x: 233, y: 137, w: 32, h: 32, frames: 2, delay: 20, },
    rw2: { x: 1, y: 171, w: 32, h: 32, frames: 2, delay: 20, },
    rw3: { x: 67, y: 171, w: 32, h: 32, frames: 2, delay: 20, },
    rw4: { x: 133, y: 171, w: 32, h: 32, frames: 2, delay: 20, },
    s1: { x: 199, y: 171, w: 32, h: 32, frames: 2, delay: 40, },
    s2: { x: 265, y: 171, w: 32, h: 32, frames: 2, delay: 40, },
    s3: { x: 264, y: 238, w: 32, h: 32, frames: 2, delay: 40, },
    w: { x: 35, y: 205, w: 32, h: 32, },
    w1: { x: 69, y: 205, w: 32, h: 32, frames: 2, delay: 20, },
    w2: { x: 135, y: 205, w: 32, h: 32, frames: 2, delay: 20, },
    w3: { x: 201, y: 205, w: 32, h: 32, frames: 2, delay: 20, },
    w4: { x: 268, y: 1, w: 32, h: 32, frames: 2, delay: 20, },
    w5: { x: 269, y: 35, w: 32, h: 32, frames: 2, delay: 20, },
    w6: { x: 239, y: 69, w: 32, h: 32, frames: 2, delay: 20, },
    w7: { x: 239, y: 103, w: 32, h: 32, frames: 2, delay: 20, },
    w8: { x: 267, y: 137, w: 32, h: 32, frames: 2, delay: 20, },

    a1: { x: 0, y: 0, w: 32 },
    a2: { x: 32, y: 0, w: 32 },
    a3: { x: 64, y: 0, w: 32 },

    d1: { x: 96, y: 0, w: 32 },
    d2: { x: 160, y: 32, w: 32 },
    d3: { x: 224, y: 64, w: 32 },
    d4: { x: 160, y: 96, w: 32 },
    d5: { x: 192, y: 96, w: 32 },
    d6: { x: 224, y: 96, w: 32 },
    d7: { x: 256, y: 96, w: 32 },
    d8: { x: 0, y: 128, w: 32 },
    d9: { x: 32, y: 128, w: 32 },
    d10: { x: 128, y: 0, w: 32 },
    d11: { x: 160, y: 0, w: 32 },
    d12: { x: 192, y: 0, w: 32 },
    d13: { x: 224, y: 0, w: 32 },
    d14: { x: 256, y: 0, w: 32 },
    d15: { x: 0, y: 32, w: 32 },
    d16: { x: 32, y: 32, w: 32 },
    d17: { x: 64, y: 32, w: 32 },
    d18: { x: 96, y: 32, w: 32 },
    d19: { x: 128, y: 32, w: 32 },
    d20: { x: 192, y: 32, w: 32 },
    d21: { x: 224, y: 32, w: 32 },
    d22: { x: 256, y: 32, w: 32 },
    d23: { x: 0, y: 64, w: 32 },
    d24: { x: 32, y: 64, w: 32 },
    d25: { x: 64, y: 64, w: 32 },
    d26: { x: 96, y: 64, w: 32 },
    d27: { x: 128, y: 64, w: 32 },
    d28: { x: 160, y: 64, w: 32 },
    d29: { x: 192, y: 64, w: 32 },
    d30: { x: 256, y: 64, w: 32 },
    d31: { x: 0, y: 96, w: 32 },
    d32: { x: 32, y: 96, w: 32 },
    d33: { x: 64, y: 96, w: 32 },
    d34: { x: 96, y: 96, w: 32 },
    d35: { x: 128, y: 96, w: 32 },

    c1: { x: 64, y: 128, w: 32 },
    c2: { x: 96, y: 128, w: 32 },
    c3: { x: 128, y: 128, w: 32 },
    c4: { x: 160, y: 128, w: 32 },

    p3: { x: 0, y: 192, w: 32 },
    p4: { x: 32, y: 192, w: 32 },
    p5: { x: 64, y: 192, w: 32 },
    p6: { x: 96, y: 192, w: 32 },
    p7: { x: 128, y: 192, w: 32 },
    p8: { x: 160, y: 192, w: 32 },
    p9: { x: 192, y: 192, w: 32 },
    p10: { x: 224, y: 128, w: 32 },
    p11: { x: 256, y: 128, w: 32 },
    p12: { x: 0, y: 160, w: 32 },
    p14: { x: 32, y: 160, w: 32 },
    p15: { x: 64, y: 160, w: 32 },
    p16: { x: 96, y: 160, w: 32 },
    p17: { x: 128, y: 160, w: 32 },
    p18: { x: 160, y: 160, w: 32 },
    p19: { x: 192, y: 160, w: 32 },
    p21: { x: 256, y: 160, w: 32 },
    p22: { x: 192, y: 128, w: 32 },
    p23: { x: 224, y: 160, w: 32 },

    k1: { x: 0, y: 224, w: 32, frames: 4, delay: 10 },
    k2: { x: 128, y: 224, w: 32, frames: 4, delay: 10 },
    k3: { x: 0, y: 256, w: 32, frames: 4, delay: 10 },
    k4: { x: 128, y: 256, w: 32, frames: 4, delay: 10 },
    k6: { x: 288, y: 0, w: 32, frames: 4, delay: 10 }
  },
  elementsInfo: {
    bigBoom: {
      x: 1,
      y: 1,
      w: 32,
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
      w: 32,
      h: 32,
      frames: 3,
      delay: 10,
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
      w: 32,
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
    signal: {
      x: 217,
      y: 31,
      w: 17,
      h: 3,
      frames: 4,
      delay: 10,
    },
    shadow: {
      x: 388,
      y: 22,
      w: 16,
      h: 3,
      frames: 1,
    },
    shootD: {
      x: 512,
      y: 1,
      w: 3,
      h: 3,
      frames: 1,
    },
    shootE: {
      x: 512,
      y: 5,
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
      w: 16,
      h: 6,
      frames: 1,
    },
    shootS: {
      x: 134,
      y: 24,
      w: 8,
      h: 6,
      frames: 9,
      delay: 12,
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
    medal: {
      x: 512,
      y: 10,
      w: 8,
      h: 16,
      frames: 1,
    },
  },
  enemiesInfo: {
    goldAlien: {
      x: 1,
      y: 1,
      w: 24,
      h: 24,
      frames: 2,
      delay: 10,
    },
    bonusR: {
      x: 53,
      y: 1,
      w: 34,
      h: 32,
      frames: 4,
      delay: 10,
    },
    bonusRClose: {
      x: 188,
      y: 1,
      w: 34,
      h: 32,
      frames: 1,
      delay: 100,
      xCoef: -1
    },
    bonusROpen: {
      x: 1,
      y: 35,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
    },
    kokon: {
      x: 224,
      y: 1,
      w: 32,
      h: 14,
      frames: 2,
      delay: 30,
    },
    kokonDie: {
      x: 224,
      y: 17,
      w: 32,
      h: 14,
    },
    kokonClose: {
      x: 56,
      y: 69,
      w: 32,
      h: 14,
    },
    lichinka: {
      x: 257,
      y: 17,
      w: 16,
      h: 16,
    },
    toothyMouth: {
      x: 103,
      y: 35,
      w: 34,
      h: 32,
      frames: 2,
      delay: 50,
    },
    snowShoot: {
      x: 170,
      y: 35,
      w: 18,
      h: 16,
      frames: 2,
      delay: 10,
    },
    sniper180: {
      x: 207,
      y: 50,
      w: 24,
      h: 32,
    },
    sniper180Shot: {
      x: 233,
      y: 50,
      w: 24,
      h: 32,
    },
    sniper135: {
      x: 259,
      y: 50,
      w: 18,
      h: 39,
    },
    sniper135Shot: {
      x: 279,
      y: 50,
      w: 18,
      h: 39,
    },
    sniper225: {
      x: 275,
      y: 17,
      w: 24,
      h: 31,
    },
    sniper225Shot: {
      x: 173,
      y: 55,
      w: 24,
      h: 30,
    },
    sniperBetwen: {
      x: 234,
      y: 277,
      w: 26,
      h: 16,
    },
    sniperHead: {
      x: 208,
      y: 277,
      w: 26,
      h: 16,
    },
    sniperHalf: {
      x: 260,
      y: 277,
      w: 26,
      h: 16,
    },
    spider: {
      x: 47,
      y: 91,
      w: 33,
      h: 32,
      frames: 4,
      delay: 10,
    },
    spiderJump: {
      x: 114,
      y: 91,
      w: 32,
      h: 32,
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
    tankR210: {
      x: 1,
      y: 125,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
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
    tankRB180: {
      x: 301,
      y: 35,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankRB150: {
      x: 299,
      y: 69,
      w: 34,
      h: 32,
      frames: 3,
      delay: 10,
      xCoef: 0,
      yCoef: 0,
    },
    tankRB120: {
      x: 282,
      y: 103,
      w: 34,
      h: 32,
      frames: 3,
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
      delay: 6,
      xCoef: -1,
      yCoef: 0,
    },
    turel: {
      x: 335,
      y: 207,
      w: 32,
      h: 32,
    },
    turelShoot: {
      x: 368,
      y: 207,
      w: 32,
      h: 32,
    },
    thiefJump: {
      x: 384,
      y: 103,
      w: 16,
      h: 28,
    },
    thiefLie: {
      x: 1,
      y: 69,
      w: 32,
      h: 14,
    },
    thiefRun: {
      x: 206,
      y: 205,
      w: 19,
      h: 32,
      frames: 6,
      delay: 10,
    },
    thiefShot: {
      x: 341,
      y: 137,
      w: 25,
      h: 32,
      frames: 2,
      delay: 10,
    },
    dip: {
      x: 225,
      y: 33,
      w: 16,
      h: 15,
      frames: 1,
      delay: 8,
      xCoef: -2,
      yCoef: 0,
    },
  },
};
export default class Level {
  constructor(number) {
    this.levelNumber = number - 1;
    this.length = map.levels[number - 1].length;
    //this.cameraX = 0;
    //this.pausePress = false;
    this.bgArray = [];
    this.elementsArray = [];
    this.canMoveCamera = true;
    this.keysOn = true;
    this.debag = true;

    this.enemyArray = [];
    this.platformActual = [];
    this.elementsActual = [];
    this.bonuses = [];
    this.bosses = []

    this.bulletsArray = [];
    this.playerBulletsArray = [];

    this.deathPlatform = new Platform(map.blockSize * 9, 2, -map.blockSize * 0.5, map.blockSize * 7 - 2, 'DEATH', false);
    this.leftBorder = new Platform(2, map.blockSize * 8, -1, -map.blockSize * 0.5, 'VERTICAL', false); //LEFTBORDER
    this.levelBorder = new Platform(map.blockSize * 12, map.blockSize * 11, -map.blockSize * 2, -map.blockSize * 2, 'LEVELBORDER', false);

    this.platformActual.push(this.deathPlatform);
    this.platformActual.push(this.leftBorder);

    // Create All elements
    const createElement = (from, type) => {
      const bs = map.blockSize;
      const createBG = (bgColumn, i) => {
        for (let j = 0; j < bgColumn.length; j += 1) {
          if (bgColumn[j] !== 0) {
            const name = bgColumn[j].split('-');
            let canJumpDown = true;
            let needVertPlatform = false;
            let isRoof = false;
            if (name.length > 1) {
              if (name.indexOf('n') !== -1) {
                canJumpDown = false;
              }
              if (name.indexOf('v') !== -1) {
                needVertPlatform = true;
              }
              if (name.indexOf('r') !== -1) {
                isRoof = true;
              }
            }
            new Bg(name[0], this.spritesInfo[name[0]], bs, bs, i * bs, j * bs, this, canJumpDown, needVertPlatform, isRoof);
          }
        }
      };

      for (let i = 0; i < from.length; i += 1) {
        switch (type) {
          case 'BG':
            createBG(from[i], i);
            break;
          case 'ELEMENT':
            elementCreator(from[i], this);
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
    createElement(map.levels[this.levelNumber].elements, 'ELEMENT');

    this.elementsActual.push(new Сurtain(this.elementsActual));
    //  this.startLevel(this);
  }

  moveCamera(dx) {
    const p = contra.pjs.vector.point;
    [this.deathPlatform.sprite,
      this.leftBorder.sprite,
      this.levelBorder.sprite,
      contra.pjs.camera,
    ].forEach(element => {
      element.move(p(dx, 0));
    });
  }

  startLevel() {
    const { pjs } = contra;
    const { isDown } = pjs.keyControl;
    const level = this;
    const j = contra.joystick;

    pjs.game.newLoop('myGame', () => {
      pjs.game.clear();

      // draw BG
      level.bgArray.forEach((el) => {
        el.sprite.draw();
      });

      const camPos = contra.pjs.camera.getPosition().x;
      // check elements to draw
      level.elementsArray.forEach((el) => {
        el.isTimeToShow(camPos);
      });

      // draw elements
      [...level.bosses, ...level.elementsActual, ...level.enemyArray, ...level.bonuses].forEach((el) => {
        el.tryAction(camPos);
      });

      // draw bullets
      [...level.bulletsArray, ...level.playerBulletsArray].forEach((el) => {
        el.draw();
      });

      /*
            level.platformActual.forEach(el => {
              el.sprite.drawStaticBox();
            });*/
      const getKey = contra.options.options;

      if (level.debag) {
        if (isDown('B')) {
          console.log('debag', contra);
        }
        this.debag = false;
        setTimeout(() => {
          this.debag = true;
        }, 500);
      }

      if (this.keysOn) {
        contra.player.calculateMoves([
          isDown(getKey.keyUp) || (j && j.buttons.up),
          isDown(getKey.keyRight) || (j && j.buttons.right),
          isDown(getKey.keyDown) || (j && j.buttons.down),
          isDown(getKey.keyLeft) || (j && j.buttons.left),
          isDown(getKey.keyJump) || (j && j.buttons.a),
          isDown(getKey.keyFire) || (j && j.buttons.b),
        ]);
      }
    });

    pjs.game.setLoop('myGame');
  }

  onKeyboard() {
    this.keysOn = !this.keysOn;
    console.log('keys', this.keysOn);
  }

  compliteLevel() {
    this.keysOn = false;
    [...level.elementsActual, ...level.enemyArray, ...level.bonuses].forEach((el) => {
      el.tryRemove(true);
    });
  }
}