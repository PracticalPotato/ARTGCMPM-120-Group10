class Load extends Phaser.Scene{
    constructor(){
        super("loadScene");
    }

    preload() {
        // Load image assets
        this.load.image('astronaut', './assets/astronaut.png');
        this.load.image('asteroid', './assets/asteroid1.png');
    }

    create(){
        this.scene.start('menuScene');
    }
}