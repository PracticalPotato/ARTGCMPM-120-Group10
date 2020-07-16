// Create game config object
"use strict"
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
};

// create main game object
let game = new Phaser.Game(config);

// reserve some keyboard bindings
let keyENTER, keyLEFT, keyRIGHT, keyUP, keyDOWN;

// define game settings
game.settings = {
    //
}