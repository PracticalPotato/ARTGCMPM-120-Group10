class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    create(){
        // add background starfield
        this.starfield = this.add.tileSprite(0, 0, 480, 640, 'starfield').setOrigin(0, 0);

        // add sound volume
        this.select = this.sound.add('sfx_select', {volume: 0.8});

        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        // gameover text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;
        this.add.sprite(centerX, centerY - textSpacer, 'gameOver')
            .setScale(1).setOrigin(0.5);
        this.choice = this.add.sprite(centerX, centerY - textSpacer + 100 , 'restart')
            .setScale(0.65).setOrigin(0.5);
        // image enter shake: source: notes of phaser 3 
        this.tweens.add({
            targets: this.choice,
            //y: { from: centerY - textSpacer + 100, to: centerY - textSpacer + 105 },
            alpha: { from: 0, to: 1 },
            // alpha: { start: 0, to: 1 },
            // alpha: 1,
            // alpha: '+=1',
            ease: 'Bounce',       // 'Cubic', 'Elastic', 'Bounce', 'Back', 'Linear'
            duration: 1000,
            repeat: -1,            // -1: infinity
            yoyo: false
        });

        // score display
        this.scoreConfig = {
            fontFamily: 'fantasy',
            fontSize: '27px',
            fontStyle: '',
            backgroundColor: '',
            color: 'gold',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // high score
        this.add.text(151, 430, 'High Score:', this.scoreConfig);
        this.add.text(282, 431, highScore, this.scoreConfig);
    }

    update(){
        this.starfield.tilePositionY += 1;
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.select.play();
            this.scene.start("playScene");    
        } 
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.select.play();
            this.scene.start("menuScene");    
        } 
    }

}