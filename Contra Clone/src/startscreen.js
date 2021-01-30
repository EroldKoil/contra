import TextLayer from './text';
import Sound from './sound';

export default function startScreen(contra, level, callback) {
  const textLayer = new TextLayer(contra.pjs);
  const blinkingTextLayer = new TextLayer(contra.pjs);
  let frameCounter = 0;
  const lastFrame = 208;

  // Очки
  textLayer.addText(2, 3, contra.lang.player1);
  blinkingTextLayer.addText(11, 3, contra.score.toString());
  // Жизни
  textLayer.addText(2, 5, contra.lang.lives);
  textLayer.addText(8, 5, contra.lives.toString());
  // Рекорд
  textLayer.addText(10, 8, contra.lang.hiScore);
  blinkingTextLayer.addText(15, 8, contra.options.get('highScore').toString());
  // Уровень
  textLayer.addCenteredText(15, `${contra.lang.stage} ${level}`);
  textLayer.addCenteredText(17, contra.lang[`levelName${level}`]);

  contra.pjs.game.newLoop('start_screen', () => {
    textLayer.draw();

    // Отображаем слой 16 кадров через 16
    if (Math.floor(frameCounter / 16) % 2 === 0) {
      blinkingTextLayer.draw();
    }

    if (frameCounter > lastFrame && !Sound.isPlaying('menuTitle')) {
      setTimeout(callback, 0);
    }
    frameCounter += 1;
  });

  contra.pjs.game.setLoop('start_screen');
}
