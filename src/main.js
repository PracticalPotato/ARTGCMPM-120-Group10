// Create game config object
"use strict"
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Load, Menu, Play, GameOver],
};

// create main game object
let game = new Phaser.Game(config);

// reserve some keyboard bindings
let keyENTER, keyLEFT, keyRIGHT, keyUP, keyDOWN;

game.settings = {
    //
}