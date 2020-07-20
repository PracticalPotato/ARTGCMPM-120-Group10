class Load extends Phaser.Scene{
    constructor(){
        super("loadScene");
    }

    preload() {
        // Load image assets
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('astronaut', './assets/astronaut.png');
        this.load.image('asteroid1', './assets/asteroid1.png');
        this.load.image('asteroid2', './assets/asteroid2.png');
        this.load.image('asteroid3', './assets/asteroid3.png');
        this.load.image('starpixel', './assets/star.png');
    }

    create(){
        this.scene.start('menuScene');
    }
}