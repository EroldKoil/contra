const STRINGS = {
  language: ['English', 'Русский', 'Беларускі'],
  menu: ['Select', 'Меню', 'Меню'],
  startGame: ['Start game', 'Старт', 'Старт'],
  options: ['Options', 'Настройки', 'Наладкі'],
  controls: ['Controls', 'Управление', 'Кіраванне'],
  setControl: ['Press key for ', 'Выбор клавиши ', 'Выбар клавішы '],
  keyUp: ['Up', 'Вверх', 'Ўверх'],
  keyDown: ['Down', 'Вниз', 'Ўніз'],
  keyLeft: ['Left', 'Влево', 'Налева'],
  keyRight: ['Right', 'Вправо', 'Направа'],
  keyFire: ['Fire', 'Огонь', 'Агонь'],
  keyJump: ['Jump', 'Прыжок', 'Скачок'],
  levelName1: ['Jungle', 'Джунгли', 'Джунглі'],
  levelName2: ['Energy zone', 'Энергетическая зона', 'Энергетычная зона'],
  levelName3: ['Alien\'s Lair', 'Логово чужого', 'Логава чужога'],
  // levelName2: ['Base1', 'База 1', 'База 1'],
  // levelName3: ['Waterfall', 'Водопад', 'Вадаспад'],
  // levelName4: ['Base2', 'База 2', 'База 2'],
  // levelName5: ['Snow field', 'Снежное поле', 'Снежнае поле'],
  // levelName6: ['Energy zone', 'Энергетическая зона', 'Энергетычная зона'],
  // levelName7: ['Hangar', 'Ангар', 'Ангар'],
  // levelName8: ['Alien\'s Lair', 'Логово чужого', 'Логава чужога'],
  player1: ['1p', '1и', '1і'],
  hiScore: ['hi', 'рек', 'рэк'],
  lives: ['rest', 'жизни', 'жыцці'],
  stage: ['stage', 'этап', 'этап'],
  gameOver: ['Game over', 'Игра окончена', 'Гульня скончана'],
  continue: ['Continue', 'Продолжить', 'Працягнуць'],
  end: ['End', 'Закончить', 'Скончыць'],
  statistics: ['Statistics:', 'Статистика:', 'Статыстыка:'],
  gameTime: ['Game time ', 'Время игры ', 'Час гульни  '],
  killed: ['Killed ', 'Убито ', 'Забіты '],
  shots: ['Shots ', 'Выстрелов ', 'Выстралаў '],
  jumps: ['Jumps ', 'Прыжков ', 'Скачкоў '],
  accuracy: ['Accuracy ', 'Точность ', 'Дакладнасць '],
  play: ['Play!', 'Играть!', 'Гуляць!'],
  dialog: ['<h3>Welcome to Contra!</h3>'
    + '<p>The gaming parlor legend is now in your browser!</p>'
    + '<p>On recreating the masterpiece worked:</p>'
    + '<ul>'
    + '  <li><a href="https://github.com/EroldKoil">Nikolay Yakubov</a></li>'
    + '  <li><a href="https://github.com/Fodin">Fedor Odintsov</a></li>'
    + '  <li><a href="https://github.com/JustAnotherAlexander">Alexander Matveenkov</a></li>'
    + '</ul>'
    + '{{<p>Controls:</p>'
    + '<ul class="two-columns">'
    + '  <li>up - {up}'
    + '  <li>down - {down}</li>'
    + '  <li>left - {left}</li>'
    + '  <li>right - {right}</li>'
    + '  <li>fire - {fire}</li>'
    + '  <li>jump - {jump}</li>'
    + '</ul>}}'
    + '<h3>Good luck in the game!</h3>'
    + '<button id="start-button">Play!</button>',
  '<h3>Добро пожаловать в Контру!</h3>'
    + '<p>Легенда игровых салонов теперь и в браузере!</p>'
    + '<p>Над воссозданием шедевра трудились:</p>'
    + '<ul>'
    + '  <li><a href="https://github.com/EroldKoil">Николай Якубов</a></li>'
    + '  <li><a href="https://github.com/Fodin">Федор Одинцов</a></li>'
    + '  <li><a href="https://github.com/JustAnotherAlexander">Александр Матвеенков</a></li>'
    + '</ul>'
    + '{{<p>Управление:</p>'
    + '<ul class="two-columns">'
    + '  <li>вверх - {up}'
    + '  <li>вниз - {down}</li>'
    + '  <li>влево - {left}</li>'
    + '  <li>вправо - {right}</li>'
    + '  <li>огонь - {fire}</li>'
    + '  <li>прыжок - {jump}</li>'
    + '</ul>}}'
    + '<h3>Удачи в игре!</h3>'
    + '<button id="start-button">Играть!</button>',
  '<h3>Сардэчна запрашаем у Контру!</h3>'
    + '<p>Легенда гульнявых салонаў зараз і ў браўзэры!</p>'
    + '<p>Над аднаўленнем шэдэўра працавалі:</p>'
    + '<ul>'
    + '  <li><a href="https://github.com/EroldKoil">Мікалай Якубаў</a></li>'
    + '  <li><a href="https://github.com/Fodin">Фёдар Адзінцоў</a></li>'
    + '  <li><a href="https://github.com/JustAnotherAlexander">Аляксандр Мацвеенка</a></li>'
    + '</ul>'
    + '{{<p>Упраўленне:</p>'
    + '<ul class="two-columns">'
    + '  <li>уверх - {up}'
    + '  <li>уніз - {down}</li>'
    + '  <li>налева - {left}</li>'
    + '  <li>направа - {right}</li>'
    + '  <li>агонь - {fire}</li>'
    + '  <li>скачок - {jump}</li>'
    + '</ul>}}'
    + '<h3>Поспехаў у гульні!</h3>'
    + '<button id="start-button">Гуляць!</button>',
  ],
  // Шаблон   z: ['', '', ''],
};

export default function getLanguageObject(lang) { // lang: 0 - English, 1 - Russian, 2 - Belorussian
  const stringsArray = {};

  Object.entries(STRINGS).forEach((item) => {
    stringsArray[item[0]] = item[1][lang];
  });
  return stringsArray;
}
