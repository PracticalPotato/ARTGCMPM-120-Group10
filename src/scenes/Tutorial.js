class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialScene");
    }

    create(){
        // add sound volume
        this.select = this.sound.add('sfx_select', {volume: 0.4});

        // text confic
        this.textConfig = {
            fontFamily: 'fantasy',
            fontSize: '23px',
            fontStyle: '',
            backgroundColor: '',
            color: 'white',
            align: 'center',    // 'left'|'center'|'right'|'justify'
            lineSpacing: 4,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        }
        this.add.text(140, 100, 'Use arrow keys to move', this.textConfig);
        this.textConfig.fontSize = '24px';
        this.add.text(80, 200, 'Avoid obstacles:', this.textConfig);
        this.add.text(133, 300, 'You got                           3', this.textConfig);
        this.add.text(45, 400, 'Collect             for speed and             for score', this.textConfig);
        this.add.text(80, 500, 'Use spacebar to dash', this.textConfig);

        // tutorial display
        this.add.sprite(250, 50, 'tutorial').setScale(0.8).setOrigin(0.5);
        this.starfield = this.add.tileSprite(0, 0, 480, 640, 'starfield').setOrigin(0, 0);
        
        this.arrowKeys = this.add.sprite(75, 115, 'arrowKeys').setScale(0.9).setOrigin(0.5);
        // lives shake: source: notes of phaser 3 
        this.tweens.add({
            targets: this.arrowKeys,
            y: { from: 119, to: 112 },
            ease: 'Back',       // 'Cubic', 'Elastic', 'Bounce', 'Back', 'Linear'
            duration: 1000,
            repeat: -1,            // -1: infinity
            yoyo: false
        });
        this.astronaut = this.add.sprite(413, 119, 'astronaut').setScale(0.9).setOrigin(0.5);

        this.asteroid = this.add.sprite(300, 220, 'asteroid2').setScale(0.8).setOrigin(0.5);
        this.alien = this.add.sprite(390, 225, 'alien').setScale(0.12).setOrigin(0.5);

        this.livesText = this.add.sprite(264, 320, 'lives').setScale(0.5).setOrigin(0.5);
        // lives shake: source: notes of phaser 3 
        this.tweens.add({
            targets: this.livesText,
            y: { from: 317, to: 320 },
            ease: 'Back',       // 'Cubic', 'Elastic', 'Bounce', 'Back', 'Linear'
            duration: 500,
            repeat: -1,            // -1: infinity
            yoyo: false
        });
        
        this.powerUp = this.add.sprite(141, 418, 'powerUp').setScale(1).setOrigin(0.5);
        // powerup blink
        this.tweens.add({
            targets: this.powerUp,
            alpha: { from: 0, to: 0.9 },
            ease: 'Elastic',       // 'Cubic', 'Elastic', 'Bounce', 'Back', 'Linear'
            duration: 700,
            repeat: -1,            // -1: infinity
            yoyo: false
        });
        this.pickup = this.add.sprite(332, 420, 'pickup').setScale(0.8).setOrigin(0.5);

        this.astronaut2 = this.add.sprite(325, 517, 'astronaut').setScale(0.9).setOrigin(0.5);

        this.enter = this.add.sprite(275, 610 , 'enterStart')
            .setScale(0.6).setOrigin(0.5);
        // image enter shake: source: notes of phaser 3 
        this.tweens.add({
            targets: this.enter,
            alpha: { from: 0, to: 1 },
            ease: 'Bounce',       // 'Cubic', 'Elastic', 'Bounce', 'Back', 'Linear'
            duration: 1000,
            repeat: -1,            // -1: infinity
            yoyo: false
        });

        // alien movement boolean
        this.alienMove = true;

        // astronaut dash boolean
        this.astronautMove = true;

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update() {
        // astronaut movement // center: 413, 119
        this.astronaut.x += Math.random() * (2 - (-2)) + (-2);
        this.astronaut.y += Math.random() * (2 - (-2)) + (-2);
        if(this.astronaut.x >= 423){
            this.astronaut.x -= 0.5;
        }
        if(this.astronaut.x <= 403){
            this.astronaut.x += 0.5;
        }
        if(this.astronaut.y >= 129){
            this.astronaut.y -= 0.5;
        }
        if(this.astronaut.y <= 109){
            this.astronaut.y += 0.5;
        }

        // alien movement // center: 390, 225
        if(this.alienMove == true){
            this.alien.x -= 0.3;
        }
        if(this.alien.x <= 380){
            this.alienMove = false;
        }
        if(this.alienMove == false){
            this.alien.x += 0.3;
        }
        if(this.alien.x >= 400){
            this.alienMove = true;
        }
       
        // images movement
        this.starfield.tilePositionY += 1;
        this.asteroid.rotation += 0.01;
        this.pickup.rotation -= 0.01;

        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.select.play();
            this.scene.start("playScene");    
        }

        // astronaut2 dash // center: 325, 517
        if(this.astronautMove == true){
            this.astronaut2.x += 8;
        }
        if(this.astronaut2.x >= 400){
            this.astronautMove = false;
        }
        if(this.astronautMove == false){
            this.astronaut2.x -= 1;
        }
        if(this.astronaut2.x <= 325){
            this.astronautMove = true;
        }
    }
}