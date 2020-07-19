class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    create(){
        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        // menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '38px',
            backgroundColor: '#F3B141',
            color: '#843605',
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
        this.add.text(centerX, centerY - textSpacer, 'GAME OVER', 
        menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        menuConfig.fontSize = '28px';
        this.add.text(game.config.width/2, game.config.height/2 + 64, 
            '(R)estart or (M)enu', menuConfig).setOrigin(0.5);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("playScene");    
        } 
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");    
        } 
    }

}