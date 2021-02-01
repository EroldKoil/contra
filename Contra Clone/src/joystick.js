import nipplejs from 'nipplejs';

export default class Joystick {
  constructor() {
    this.buttons = {
      up: false,
      right: false,
      down: false,
      left: false,
      a: false,
      b: false,
    };
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
    manager.on('dir:up  dir:left dir:down dir:right',
      (evt) => {
        this.buttons.up = false;
        this.buttons.right = false;
        this.buttons.down = false;
        this.buttons.left = false;

        switch (evt.type) {
          case 'dir:up':
            this.buttons.up = true;
            break;
          case 'dir:right':
            this.buttons.right = true;
            break;
          case 'dir:down':
            this.buttons.down = true;
            break;
          case 'dir:left':
            this.buttons.left = true;
            break;
          default: break;
        }
      });
    manager.on('end',
      () => {
        this.buttons.up = false;
        this.buttons.right = false;
        this.buttons.down = false;
        this.buttons.left = false;
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

  // Показать джойстик и кнопки
  show() {
    this.options.zone.style.display = '';
    document.getElementById('a_button').style.display = '';
    document.getElementById('b_button').style.display = '';
  }

  // Скрыть джойстик и кнопки
  hide() {
    this.options.zone.style.display = 'none';
    document.getElementById('a_button').style.display = 'none';
    document.getElementById('b_button').style.display = 'none';
  }
}
