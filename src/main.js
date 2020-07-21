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
            //debug: true,
            //gravity: {
                //x: 0,
                //y: 0
            //}
        }
    },
    scene: [Load, Menu, Play, GameOver],
};

// create main game object
let game = new Phaser.Game(config);

// reserve some keyboard bindings
let keyENTER, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyR, keyM;

game.settings = {
    
}

// Notes: source: https://gist.github.com/kerimdzhanov/7529623
// Get a random floating point number between min and max
// var value = Math.random() * (max - min) + min;

// Get a random integer between min and max
// var value = Math.floor(Math.random() * (max - min + 1) + min);
// Phaser.Math.Between(min, max);

// Get a random boolean value.
// Math.random() >= 0.5;