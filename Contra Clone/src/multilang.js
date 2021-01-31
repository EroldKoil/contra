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
  levelName2: ['Alien\'s Lair', 'Логово чужого', 'Логава чужога'],
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
  dialog: ['', 'Добро пожаловать в Контру! \n' +
    'Легенда игровых салонов теперь и в браузере.\n' +
    'Над воссозданием игры трудились:\n' +
    'Николай Якубов (гитхаб), Федор Одинцов, Александр Матвеенков\n' +
    'Управление: вверх - W, вниз - S, влево - A, вправо - D, огонь - O, прыжок - P.\n' +
    'Удачи в игре!', ''
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