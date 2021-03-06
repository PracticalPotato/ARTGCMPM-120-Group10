class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    create(){
        this.cameras.main.fadeIn(1500, 0, 0, 0)

        // add background starfield
        this.starfield = this.add.tileSprite(0, 0, 480, 640, 'starfield').setOrigin(0, 0);

        // add sound volume
        this.select = this.sound.add('sfx_select', {volume: 0.4});

        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        // gameover text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;
        this.add.sprite(centerX, centerY - textSpacer, 'gameOver')
            .setScale(1).setOrigin(0.5);
        this.restart = this.add.sprite(centerX, centerY - textSpacer + 100 , 'restart')
            .setScale(0.65).setOrigin(0.5);
        // image enter shake: source: notes of phaser 3 
        this.tweens.add({
            targets: this.restart,
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
        // high score & current score
        this.add.sprite(105, 453, 'score')
            .setScale(0.5);
        this.add.text(155, 430, currentScore, this.scoreConfig);
        this.add.sprite(315, 453, 'highScore')
            .setScale(0.5);
        this.add.text(405, 430, highScore, this.scoreConfig);
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