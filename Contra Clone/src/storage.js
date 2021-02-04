const STORAGE_PREFIX = 'contra';

export default class Storage {
  // Сохранение значения value с ключом key в localStorage
  static save(key, value) {
    localStorage.setItem(`${STORAGE_PREFIX}-${key}`, JSON.stringify(value));
  }

  // Получение значения по ключу key из localStorage
  static load(key) {
    const rawValue = localStorage.getItem(`${STORAGE_PREFIX}-${key}`);

    if (rawValue === null) return null;

    return JSON.parse(rawValue);
  }
}
