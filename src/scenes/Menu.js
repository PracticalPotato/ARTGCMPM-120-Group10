class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    create(){
        // add background starfield
        this.starfield = this.add.tileSprite(0, 0, 480, 640, 'starfield').setOrigin(0, 0);

        // add sound volume
        this.select = this.sound.add('sfx_select', {volume: 0.4});

        // menu display
        let scoreConfig = {
            fontFamily: 'fantasy',
            fontSize: '27px',
            backgroundColor: '',
            color: 'gold',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;
        
        this.add.sprite(centerX, centerY - textSpacer, 'missionImpossible')
            .setScale(1).setOrigin(0.5);
        this.enter = this.add.sprite(centerX, centerY - textSpacer + 100 , 'enterStart')
            .setScale(0.65).setOrigin(0.5);
        // image enter shake: source: notes of phaser 3 
        this.tweens.add({
            targets: this.enter,
            //y: { from: centerY - textSpacer + 100, to: centerY - textSpacer + 105 },
            alpha: { from: 0, to: 1 },
            // alpha: { start: 0, to: 1 },
            // alpha: 1,
            // alpha: '+=1',
            ease: 'Bounce',       // 'Cubic', 'Elastic', 'Bounce', 'Back', 'Linear'
            duration: 2000,
            repeat: -1,            // -1: infinity
            yoyo: false
        });
        
        // display menu text
        this.add.text(20, 20, "Mission Impossible Menu");
        this.add.text(87, 615, "@copyright John Payne & Calvin Rong 2020");

        // high score & current score
        this.add.sprite(90, 498, 'score')
            .setScale(0.5);
        this.add.text(140, 475, currentScore, scoreConfig);
        this.add.sprite(305, 497, 'highScore')
            .setScale(0.5);
        this.add.text(395, 474, highScore, scoreConfig);

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update() {
        this.starfield.tilePositionY += 1;
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.select.play();
            this.scene.start("tutorialScene");    
        } 
    }

}