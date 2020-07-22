class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    create(){
        // add background starfield
        this.starfield = this.add.tileSprite(0, 0, 480, 640, 'starfield').setOrigin(0, 0);

        // add sound volume
        this.select = this.sound.add('sfx_select', {volume: 0.8});

        // menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
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
        
        this.add.text(centerX, centerY - textSpacer, 'Mission Impossible', 
        menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + 5, 'Use ← → ↑ ↓ arrows to move', 
        menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 70, 'Press Enter to Start', 
        menuConfig).setOrigin(0.5);
        
        // display menu text
        this.add.text(20, 20, "Mission Impossible Menu");

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