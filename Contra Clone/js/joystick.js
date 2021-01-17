 class Joystick {
    constructor() {
         this.buttons = {
            up: false,
            right: false,
            down: false,
            left: false,
            pause: false,
            a: false,
            b:false,
        }
        let options = {
            zone: document.getElementById('zone_joystick'),                  // active zone
            color: 'white',
            size: 150,
            threshold: 0.1,               // before triggering a directional event
            fadeTime: 500,              // transition time
            multitouch: false,
            dataOnly: false,              // no dom element whatsoever
            position: {bottom: '15px', left: '15px'},               // preset position for 'static' mode
            mode: 'static',                   // 'dynamic', 'static' or 'semi'
            restJoystick: true,
            restOpacity: 1,            // opacity when not 'dynamic' and rested
            lockX: false,                 // only move on the X axis
            lockY: false,                 // only move on the Y axis
            shape: 'circle',                  // 'circle' or 'square'
            dynamicPage: false,           // Enable if the page has dynamically visible elements
        };

        let manager = nipplejs.create(options);
        manager.on('dir:up  dir:left dir:down dir:right',

        (evt) => {
        
            switch (evt.type) {
                case 'dir:up' :
                    {
                        this.buttons.up = true;
                        this.buttons.right = false;
                        this.buttons.down = false;
                        this.buttons.left = false;
                    }
                break
                case 'dir:right' :
                    {
                        this.buttons.up = false;
                        this.buttons.right = true;
                        this.buttons.down = false;
                        this.buttons.left = false;
                    }
                break
                case 'dir:down' :
                    {
                        this.buttons.up = false;
                        this.buttons.right = false;
                        this.buttons.down = true;
                        this.buttons.left = false;
                    }
                break

                case 'dir:left' :
                    {
                        this.buttons.up = false;
                        this.buttons.right = false;
                        this.buttons.down = false;
                        this.buttons.left = true;
                    }
                break

            }
        console.log('this.buttons: ', this.buttons);
        })
        manager.on("end",
            () => {
                this.buttons.up = false;
                this.buttons.right = false;
                this.buttons.down = false;
                this.buttons.left = false;
                console.log('this.buttons: ', this.buttons)
            }
        )
    }
}