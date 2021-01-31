const sounds = {
  siren: { src: '../assets/audio/siren.mp3' }, // сирена после подхода к боосу первого уровня
  stomp: { src: '../assets/audio/stomp.mp3' }, // приземление игрока
  boost: { src: '../assets/audio/boost.mp3' }, // поднял улучшение
  fireD: { src: '../assets/audio/fire-plain.mp3' }, // огонь из обычного оружия
  fireM: { src: '../assets/audio/fire-m.mp3' },
  fireF: { src: '../assets/audio/fire-f.mp3' },
  fireL: { src: '../assets/audio/fire-l.mp3' },
  fireS: { src: '../assets/audio/fire-s.mp3' },
  plusLife: { src: '../assets/audio/plus-life.mp3' }, // призовая жизнь
  damage: { src: '../assets/audio/damage.mp3' }, // попадание, урон врагу
  enemyDeath: { src: '../assets/audio/enemy-death.mp3' }, // взрыв врага
  explosion: { src: '../assets/audio/explosion.mp3' }, // взрыв моста, пушек и т.д.
  afterBossDeath: { src: '../assets/audio/after-boss-death.mp3' },
  boss1death: { src: '../assets/audio/boss1-death.mp3' },
  boss2death: { src: '../assets/audio/boss8-death.mp3' },
  gameOver: { src: '../assets/audio/game-over.mp3' },
  playerDeath: { src: '../assets/audio/player-death.mp3' },
  credits: { src: '../assets/audio/credits.mp3' }, // Финальные титры
  menuTitle: { src: '../assets/audio/title.mp3' },
  level1start: { src: '../assets/audio/level1-start.mp3' },
  level1repeat: { src: '../assets/audio/level1-repeat.mp3' },
  level2start: { src: '../assets/audio/level8-start.mp3' },
  level2repeat: { src: '../assets/audio/level8-repeat.mp3' },
};

let currentLevel = 1;
let musicVolume = 1;

export default class Sound {
  static init() {
    Object.values(sounds).forEach((e) => {
      e.audio = new Audio(e.src);
    });
  }

  // Проиграть звук
  // ВАЖНО!!! Если вызвать для того же звука до окончания его звучания, текущий звук прервется.
  static play(sound) {
    sounds[sound].audio.currentTime = 0;
    sounds[sound].audio.play();
  }

  // Остановить проигрывание звука
  static stop(sound) {
    sounds[sound].audio.pause();
    sounds[sound].audio.currentTime = 0;
  }

  // Установить громкость звука
  static volume(sound, volume) {
    sounds[sound].audio.volume = volume;
  }

  // Возвращает уровень громкости звука
  static getVolume(sound) {
    return sounds[sound].audio.volume;
  }

  // Возвращает true, если сейчас проигрывается звук sound
  static isPlaying(sound) {
    return sounds[sound].audio.currentTime > 0 &&
      sounds[sound].audio.currentTime < sounds[sound].audio.duration;
  }

  // Запуск проигрывания музыки
  static playMusic(level, volume = 1) {
    currentLevel = level;
    musicVolume = volume;
    sounds[`level${level}start`].audio.volume = musicVolume;
    sounds[`level${level}start`].audio.play();
    sounds[`level${level}start`].audio.addEventListener('ended', this.continueMusic);
  }

  // Остановить проигрывание музыки
  static stopMusic() {
    this.stop(`level${currentLevel}start`);
    this.stop(`level${currentLevel}repeat`);
    sounds[`level${currentLevel}start`].audio.removeEventListener('ended', this.continueMusic);
  }

  // Служебный метод слушатель события окончания проигрывания музыки
  static continueMusic() {
    sounds[`level${currentLevel}start`].audio.removeEventListener('ended', this.continueMusic);
    sounds[`level${currentLevel}repeat`].audio.loop = true;
    sounds[`level${currentLevel}repeat`].audio.volume = musicVolume;
    sounds[`level${currentLevel}repeat`].audio.play();
  }
}
