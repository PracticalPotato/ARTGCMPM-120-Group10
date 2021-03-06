class Load extends Phaser.Scene{
    constructor(){
        super("loadScene");
    }

    preload() {
        // Load image assets
        this.load.image('speed', './assets/speed.png');
        this.load.image('score', './assets/score.png');
        this.load.image('highScore', './assets/highScore.png');
        this.load.image('tutorial', './assets/tutorial.png');
        this.load.image('arrowKeys', './assets/ArrowKeys.png');
        this.load.image('powerUp', './assets/powerUp.png');
        this.load.image('lives', './assets/lives.png');
        this.load.image('restart', './assets/restart.png');
        this.load.image('gameOver', './assets/gameOver.png');
        this.load.image('missionImpossible', './assets/MissionImpossible.png');
        this.load.image('enterStart', './assets/EnterStart.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield2', './assets/starfield2.png');
        this.load.spritesheet('astronaut', './assets/AstronautSheet.png', {
            frameWidth: 34, 
            frameHeight: 52,
        });
        this.load.image('asteroid1', './assets/Asteroid1.png');
        this.load.image('asteroid2', './assets/Asteroid2.png');
        this.load.image('asteroid3', './assets/Asteroid3.png');
        this.load.image('pickup', './assets/PickUp.png');
        this.load.image('alien', './assets/alien2.png');
        // Load audio assets
        this.load.audio('sfx_thruster', './assets/audio/Thruster.wav');
        this.load.audio('sfx_break', './assets/audio/Break.wav');
        this.load.audio('sfx_select', './assets/audio/Select.wav');
        this.load.audio('sfx_powerUp', './assets/audio/powerUp.wav');
        this.load.audio('sfx_pickups', './assets/audio/Pickup.wav');
        this.load.audio('sfx_pickups2', './assets/audio/Pickup2.wav');
        this.load.audio('sfx_2NROBOT', './assets/audio/2NROBOT.mp3');
    }

    create(){
        // add global sound thruster for arcade physics object Astronaut
        thruster = this.sound.add('sfx_thruster', {volume: 0.35});
        // start menu scene
        this.scene.start('menuScene');
    }
}