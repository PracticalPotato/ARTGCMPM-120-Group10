class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('astronaut', './assets/astronaut.png');


    }

    create() {
        // add rocket (p1)
        this.p1Astronaut = new Astronaut(this, game.config.width/2, 431, 
            'astronaut', 0).setOrigin(0, 0);
        
        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {

        this.p1Astronaut.update();

    }
    

}