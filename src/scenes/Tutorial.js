class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialScene");
    }

    create(){
        // add sound volume
        this.select = this.sound.add('sfx_select', {volume: 0.4});

        // menu display
        this.add.tileSprite(0, 0, 480, 640, 'tutorial').setOrigin(0, 0);

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.select.play();
            this.scene.start("playScene");    
        } 
    }

}