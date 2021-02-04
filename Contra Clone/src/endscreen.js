import TextLayer from './text';
import Sound from './sound';
import Level from './level';
import mainMenu from './mainmenu';
import startScreen from './startscreen';

export default function endScreen(contra, level) {
  const { pjs } = contra;
  const textLayer = new TextLayer(pjs);
  const blinkingTextLayer = new TextLayer(pjs);
  let frameCounter = 0;

  contra.countAccuracy();
  contra.countTime();

  if (contra.results.score > contra.options.get('highScore')) {
    contra.options.set('highScore', contra.results.score);
  }

  const selEagle = pjs.game.newImageObject({
    file: '../assets/main_menu/eagle_selector.png',
    x: 0,
    y: 0,
    w: 16,
    h: 16,
  });

  Sound.stopMusic();

  // Очки
  textLayer.addText(2, 2, contra.lang.player1);
  blinkingTextLayer.addText(6, 2, contra.results.score.toString());
  // Хайскор
  textLayer.addText(18, 2, contra.lang.hiScore);
  blinkingTextLayer.addText(22, 2, contra.options.get('highScore').toString());
  // Игра окончена
  textLayer.addCenteredText(5, contra.lang.gameOver);
  // Продолжить
  textLayer.addText(13, 8, contra.lang.continue);
  // Закончить
  textLayer.addText(13, 10, contra.lang.end);
  // Статистика
  textLayer.addCenteredText(14, contra.lang.statistics);

  // Вспомогательная функция, получает отформатированное значение статистики в виде строки
  const getStatsValue = (name) => {
    const value = contra.results.stats[name];
    switch (name) {
      case 'gameTime':
        return `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`;
      case 'accuracy':
        return `${value}%`;
      default:
        return value.toString();
    }
  };

  // Вывод статистики, выровненной по формату
  const statsNames = ['gameTime', 'killed', 'shots', 'jumps', 'accuracy'];
  let maxLength = Math.max(...statsNames.map((name) => `${contra.lang[name]} ${getStatsValue(name)}`.length));
  maxLength += maxLength % 2;

  statsNames.forEach((name, index) => {
    const statName = contra.lang[name];
    const statValue = getStatsValue(name);
    const padding = ' '.repeat(maxLength - (statName.length + statValue.length + 1));
    textLayer.addCenteredText(17 + index * 2, `${statName}${padding}${statValue}`);
  });

  function clearStatistics() {
    // eslint-disable-next-line no-param-reassign
    contra.lives = 3;
    const res = contra.results;
    res.bulletsCount = 0;
    res.scoreForLife = 0;
    res.score = 0;
    res.miss = 0;
    res.stats.gameTime = 0;
    res.stats.killed = 0;
    res.stats.shots = 0;
    res.stats.jumps = 0;
    res.stats.accuracy = 0;
  }

  let menuState = 0;
  const keyUp = contra.options.get('keyUp');
  const keyDown = contra.options.get('keyDown');
  const keyFire = contra.options.get('keyFire');

  // Цикл отображения
  pjs.game.newLoop('end_screen', () => {
    textLayer.draw();

    // Отображаем слой 16 кадров через 16
    if (Math.floor(frameCounter / 16) % 2 === 0) {
      blinkingTextLayer.draw();
    }
    frameCounter = (frameCounter + 1) % 64;

    // Рисуем орла
    selEagle.setPosition(pjs.vector.point(10 * 8 - 4, (8 + 2 * Math.min(menuState, 2)) * 8 - 4));
    selEagle.draw();

    // Отрабатываем перемещение орла
    if (pjs.keyControl.isPress(keyDown) || pjs.keyControl.isPress(keyUp)) {
      menuState = (menuState + 1) % 2;
    }

    // Обработка активации пунктов меню
    if (pjs.keyControl.isPress(keyFire)) {
      Sound.stop('gameOver');
      clearStatistics();

      if (menuState === 0) {
        // Continue
        // eslint-disable-next-line no-param-reassign
        contra.timeStart = new Date();
        setTimeout(startScreen, 0, contra, level, contra.startGame);
      } else {
        // End
        setTimeout(mainMenu, 0, contra);
      }
    }

    // Обработка тачпада
    if (pjs.touchControl.isPress()) {
      let { x, y } = pjs.touchControl.getPositionS();
      const canvas = document.querySelector('canvas');
      const ratio = canvas.offsetWidth / 256;
      x = (x - canvas.offsetLeft) / ratio;
      y = (y - canvas.offsetTop) / ratio;

      if (13 * 8 < x && x < (13 + contra.lang.startGame.length) * 8 &&
        8 * 8 - 4 < y && y < 9 * 8 + 4) {
        // Был тач к Continue
        Sound.stop('gameOver');
        clearStatistics();
        // eslint-disable-next-line no-param-reassign
        contra.selectedLevel = new Level(level, contra);
        contra.startGame();
      } else if (13 * 8 < x && x < (13 + contra.lang.language.length) * 8 &&
        10 * 8 - 4 < y && y < 11 * 8 + 4) {
        // Был тач к End
        Sound.stop('gameOver');
        clearStatistics();
        setTimeout(mainMenu, 0, contra);
      }
    }
  });

  Sound.play('gameOver');
  pjs.game.setLoop('end_screen');
}
