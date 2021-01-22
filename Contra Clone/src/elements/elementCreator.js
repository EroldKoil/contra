// { name: 'bridge', x: 24 * blockSaize, y: 4 * blockSaize, width: 4 },

import Bridge from './bridge';

export default class ElementCreator {
  constructor(el, level, levelSprites) {
    switch (el.name) {
      case 'bridge':
        console.log(el);
        new Bridge(el.blockCount, el.x, el.y, level, levelSprites);
        break;

      default:
        break;
    }
  }
}
