import Storage from './storage';

export default class Options {
  constructor() {
    this.options = Storage.load('options');

    if (this.options === null) {
      this.options = {
        language: 0,
        keyUp: 'W',
        keyDown: 'S',
        keyLeft: 'A',
        keyRight: 'D',
        keyFire: 'O',
        keyJump: 'P',
        highScore: 20000,
        musicVolume: 0.5,
      };

      Storage.save('options', this.options);
    }
  }

  // Получить указанную опцию option
  get(option) {
    return this.options[option];
  }

  // Установить и сохранить в localStorage указанную опцию option со значением value
  set(option, value) {
    this.options[option] = value;

    Storage.save('options', this.options);
  }

  // Установить указанную временную опцию option со значением value.
  // Значение не сохраняется в localStorage.
  setTemp(option, value) {
    this.options[option] = value;
  }
}
