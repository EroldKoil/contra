 class Joystick {
    constructor(pjs) {
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
            color: 'darkgrey',
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
        );


        let a_button = document.createElement('div');
        a_button.innerHTML = "<img class='button_image' src='./src/sprites/buttons/a_button.png' alt='a_button'>";
        let b_button = document.createElement('div');
        b_button.innerHTML = "<img class='button_image' src='./src/sprites/buttons/b_button.png' alt='b_button'>";
        let start_button = document.createElement('div');
        start_button.innerHTML = "<img class='button_image' src='./src/sprites/buttons/start_button.png' alt='start_button'>";
        
        a_button.className = 'a_display_button';
        a_button.id = 'a_display_button'
        b_button.className = 'b_display_button';
        b_button.id = 'b_display_button'
        start_button.className = 'start_display_button';
        start_button.id = 'start_display_button'

        document.body.append(a_button);
        document.body.append(b_button);
        document.body.append(start_button);

        document.getElementById('a_display_button').addEventListener("mousedown", ()=>{this.buttons.a = true; console.log(this.a);});
        document.getElementById('a_display_button').addEventListener("mouseup", ()=>{this.buttons.a = false; console.log(this.a);});
        document.getElementById('b_display_button').addEventListener("mousedown", ()=>{this.buttons.b = true; console.log(this.b);});
        document.getElementById('b_display_button').addEventListener("mouseup", ()=>{this.buttons.b = false; console.log(this.b);});
        document.getElementById('start_display_button').addEventListener("mousedown", ()=>{this.buttons.pause = true; console.log(this.pause);});
        document.getElementById('start_display_button').addEventListener("mouseup", ()=>{this.buttons.pause = false; console.log(this.pause);});
    }
}