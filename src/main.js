// Create game config object
"use strict"
let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade'
    },
    scene: [Load, Menu, Play],
};

// create main game object
let game = new Phaser.Game(config);

// reserve some keyboard bindings
let keyENTER, keyLEFT, keyRIGHT, keyUP, keyDOWN;

game.settings = {
    //
}