class Load extends Phaser.Scene{
    constructor(){
        super("loadScene");
    }

    preload() {
        // Load image assets
        this.load.image('missionImpossible', './assets/MissionImpossible.png');
        this.load.image('enterStart', './assets/EnterStart.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield2', './assets/starfield2.png');
        this.load.image('astronaut', './assets/Astronaut.png');
        this.load.image('asteroid1', './assets/Asteroid1.png');
        this.load.image('asteroid2', './assets/Asteroid2.png');
        this.load.image('asteroid3', './assets/Asteroid3.png');
        this.load.image('tutorial', './assets/TutorialMockup.png');
        this.load.image('pickup', './assets/PickUp.png');
        this.load.audio('sfx_break', './assets/audio/Break.wav');
        this.load.audio('sfx_select', './assets/audio/Select.wav');
        this.load.audio('sfx_pickups', './assets/audio/Pickup.wav');
        this.load.audio('sfx_pickups2', './assets/audio/Pickup2.wav');
        this.load.audio('sfx_2NROBOT', './assets/audio/2NROBOT.mp3');
    }

    create(){
        this.scene.start('menuScene');
    }
}