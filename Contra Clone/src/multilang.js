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
  level1name: ['Jungle', 'Джунгли', 'Джунглі'],
  level2name: ['Base1', 'База 1', 'База 1'],
  level3name: ['Waterfall', 'Водопад', 'Вадаспад'],
  level4name: ['Base2', 'База 2', 'База 2'],
  level5name: ['Snow field', 'Снежное поле', 'Снежнае поле'],
  level6name: ['Energy zone', 'Энергетическая зона', 'Энергетычная зона'],
  level7name: ['Hangar', 'Ангар', 'Ангар'],
  level8name: ['Alien\'s Lair', 'Логово чужого', 'Логава чужога'],
  // Шаблон   z: ['', '', ''],
};

export default function getLanguageObject(lang) { // lang: 0 - English, 1 - Russian, 2 - Belorussian
  const stringsArray = {};

  Object.entries(STRINGS).forEach((item) => {
    stringsArray[item[0]] = item[1][lang];
  });
  return stringsArray;
}
