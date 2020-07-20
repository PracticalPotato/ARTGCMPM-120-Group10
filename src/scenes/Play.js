class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    create() {
        // define constants
        this.asteroidVELOCITY = 450;
        
        // define keys, declared in main.js
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // add background starfield
        this.starfield = this.add.tileSprite(0, 0, 480, 640, 'starfield').setOrigin(0, 0);

        // add astronaut (p1)
        this.p1Astronaut = new Astronaut(this, game.config.width/2, 431, 'astronaut', 0).setOrigin(0, 0);

        // setup asteroid group
        this.asteroidGroup = this.add.group({
            runchildUpdate: true
        });

        // start asteroid spawn loop
        this.asteroidSpawn();

        // game over flag
        this.gameOver = false;

        // collision
        this.physics.add.overlap(this.p1Astronaut, this.asteroidGroup, 
            this.death, null, this);
    }

    // asteroid spawn loop
    asteroidSpawn() {
        // Add asteroid
        let asteroid = new Asteroid(this, this.asteroidVELOCITY);
        this.asteroidGroup.add(asteroid);
        // Call asteroidSpawn on a random delay
        let delay = Phaser.Math.Between(500,1000);
        var timer = this.time.delayedCall(delay, this.asteroidSpawn, [], this);
    }

    // astronaut death
    death(){
        this.gameOver = true;
        this.p1Astronaut.destroy();
        this.scene.start('gameOverScene');
    }

    update() {
        this.starfield.tilePositionY -= 4;

        if(!this.gameOver){
            this.p1Astronaut.update();
        }

    }
    

}