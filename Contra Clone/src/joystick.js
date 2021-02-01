import nipplejs from 'nipplejs';

export default class Joystick {
  constructor() {
    this.buttons = {
      a: false,
      b: false,
    };
    this.setButtons(false, false, false, false);

    this.options = {
      zone: document.getElementById('zone_joystick'), // active zone
      color: 'darkgrey',
      size: 100,
      threshold: 0.1, // before triggering a directional event
      fadeTime: 500, // transition time
      multitouch: false,
      dataOnly: false, // no dom element whatsoever
      position: { bottom: '15px', left: '15px' }, // preset position for 'static' mode
      mode: 'static', // 'dynamic', 'static' or 'semi'
      restJoystick: true,
      restOpacity: 1, // opacity when not 'dynamic' and rested
      lockX: false, // only move on the X axis
      lockY: false, // only move on the Y axis
      shape: 'circle', // 'circle' or 'square'
      dynamicPage: false, // Enable if the page has dynamically visible elements
    };

    const manager = nipplejs.create(this.options);

    manager.on('move',
      (evt, x) => {
        if (x.distance > this.options.size * this.options.threshold) {
          const angle = x.angle.degree;
          this.setButtons(angle > 22.5 && angle < 157.5, !(angle > 67.5 && angle < 292.5),
            angle > 202.5 && angle < 337.5, angle > 112.5 && angle < 247.5);
        }
      });
    manager.on('end',
      () => {
        this.setButtons(false, false, false, false);
      });

    const createButton = (name) => {
      const button = document.createElement('div');
      button.innerHTML = `<img class="button_image" src="../assets/sprites/buttons/${name}.png">`;
      button.id = `${name}_button`;
      document.body.append(button);
      document.getElementById(`${name}_button`).addEventListener('touchstart', () => { this.buttons[name] = true; });
      document.getElementById(`${name}_button`).addEventListener('touchend', () => { this.buttons[name] = false; });
    };

    createButton('a');
    createButton('b');
  }

  // Установка значений кнопок
  setButtons(up, right, down, left) {
    this.buttons.up = up;
    this.buttons.right = right;
    this.buttons.down = down;
    this.buttons.left = left;
  }

  // Скрыть/показать джойстик
  displayJoystick(show) {
    const value = show ? '' : 'none';
    this.options.zone.style.display = value;
    document.getElementById('a_button').style.display = value;
    document.getElementById('b_button').style.display = value;
  }
}
