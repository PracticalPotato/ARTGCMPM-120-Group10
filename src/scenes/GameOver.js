class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    create(){
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
        this.add.text(centerX, centerY - textSpacer, 'GameOver', 
        menuConfig).setOrigin(0.5);
        console.log = ("Hello");
    }

}