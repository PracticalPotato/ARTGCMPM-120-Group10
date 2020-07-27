class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    create() {
        // add sound volume
        this.break = this.sound.add('sfx_break', {volume: 0.1});
        this.pickups = this.sound.add('sfx_pickups', {volume: 0.15});
        this.pickups2 = this.sound.add('sfx_pickups2', {volume: 0.15});
        this.powerUp = this.sound.add('sfx_powerUp', {volume: 0.15});

        // add music
        this.bgMusic = this.sound.add('sfx_2NROBOT', {volume: 0.18});
        this.bgMusic.loop = true;
        this.bgMusic.play();

        // define constants
        this.asteroidVELOCITY = 150;
        this.fasterDelay = 1;
        this.pickupVELOCITY = 140;
        
        // define keys, declared in main.js
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // add background starfield
        this.starfield = this.add.tileSprite(0, 0, 480, 640, 'starfield2').setOrigin(0, 0);
        this.starfieldSpeed = 1.5;

        // score display
        this.scoreConfig = {
            fontFamily: 'fantasy',
            fontSize: '27px',
            fontStyle: '',
            backgroundColor: '',
            color: 'gold',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // current score
        currentScore = 0;
        this.add.sprite(360, 32, 'score')
            .setScale(0.6);
        this.currentScoreT = this.add.text(418, 9, currentScore, this.scoreConfig);

        // high score
        this.add.sprite(332, 619, 'highScore')
            .setScale(0.5);
        this.highScoreT = this.add.text(419, 596, highScore, this.scoreConfig);

        // lives display
        this.lives = 3;
        this.livesText = this.add.sprite(65, 30, 'lives')
            .setScale(0.5).setOrigin(0.5);
        // image lives shake: source: notes of phaser 3 
        this.tweens.add({
            targets: this.livesText,
            y: { from: 26, to: 30 },
            ease: 'Back',       // 'Cubic', 'Elastic', 'Bounce', 'Back', 'Linear'
            duration: 500,
            repeat: -1,            // -1: infinity
            yoyo: false
        });
        this.scoreConfig.color = 'red';
        this.livesNumber = this.add.text(117, 9, this.lives, this.scoreConfig);

        // speed display
        this.scoreConfig.color = 'white';
        this.add.sprite(53, 619, 'speed')
            .setScale(0.5);
        this.scoreConfig.fontSize = '25px';
        this.speedT = this.add.text(98, 598, '', this.scoreConfig);

        // add astronaut (p1)
        this.p1Astronaut = new Astronaut(this, game.config.width/2, 431, 'astronaut', 0);

        // setup asteroid group
        this.asteroidGroup = this.add.group({
            runchildUpdate: true
        });

        // setup powerUp group
        this.powerUpGroup = this.add.group({
            runchildUpdate: true
        });
        // setup alien group
        this.alienGroup = this.add.group({
            runchildUpdate: true
        });
        // setup pickup group
        this.pickupGroup = this.add.group({
            runchildUpdate: true
        });
        this.pickupGroup2 = this.add.group({
            runchildUpdate: true
        });

        // start powerUp spawn loop
        this.timedEvent3 = this.time.delayedCall(10000, 
            onEvent3, [], this);
        function onEvent3 ()
        {
            this.powerUpSpawn();
        }

        // start asteroid spawn loop
        this.asteroidSpawn();

        // start alien spawn loop
        this.timedEvent2 = this.time.delayedCall(25000, 
            onEvent2, [], this);
        function onEvent2 ()
        {
            this.alienSpawn();
        }

        // start pickup spawn loop
        this.pickupSpawn();
        this.pickupSpawn2();

        // game over flag
        this.gameOver = false;

        // collision
        this.physics.add.overlap(this.p1Astronaut, this.asteroidGroup, 
            this.astronautHit, null, this);
        this.physics.add.overlap(this.p1Astronaut, this.pickupGroup, 
            this.pickupGet, null, this);
        this.physics.add.overlap(this.p1Astronaut, this.pickupGroup2, 
            this.pickupGet2, null, this);
        this.physics.add.overlap(this.p1Astronaut, this.alienGroup, 
            this.astronautHit, null, this);
        this.physics.add.overlap(this.p1Astronaut, this.powerUpGroup, 
            this.powerUpGet, null, this);

        // difficulty increase
        this.timedEvent = this.time.addEvent({ 
            delay: 10000, 
            callback: onEvent, 
            callbackScope: this, 
            //loop: true,
            repeat: 12, 
        });
        function onEvent ()
        {
            if(!this.gameOver){
                this.asteroidVELOCITY += 12.5;
                this.fasterDelay *= 0.93;
                this.starfieldSpeed += 0.3;
                this.difficultyT = this.add.text(game.config.width/2-150, game.config.height*2/5,
                    "Difficulty Up!", this.scoreConfig).setOrigin(0, 0);
                    this.tweens.add({
                        targets: this.difficultyT,
                        x: { from: game.config.width/2-150, to: game.config.width/2-50 },
                        ease: 'Cubic',       // 'Cubic', 'Elastic', 'Bounce', 'Back', 'Linear'
                        duration: 500,
                        repeat: 0,            // -1: infinity
                        yoyo: false
                    });
                this.time.delayedCall(1000, () => {
                    this.difficultyT.destroy();
                }, [], this);
            }
        }
    }

    // powerUp spawn loop (Phaser Notes Source)
    powerUpSpawn() {
        // add power ip
        var powerUp = new PowerUp(this, this.pickupVELOCITY 
            * (Math.random() * (1.3 - 1) + 1)).setScale(1.1, 1.1);
        // powerup blink
        this.tweens.add({
            targets: powerUp,
            //y: { from: centerY - textSpacer + 100, to: centerY - textSpacer + 105 },
            alpha: { from: 0, to: 0.9 },
            // alpha: { start: 0, to: 1 },
            // alpha: 1,
            // alpha: '+=1',
            ease: 'Elastic',       // 'Cubic', 'Elastic', 'Bounce', 'Back', 'Linear'
            duration: 700,
            repeat: -1,            // -1: infinity
            yoyo: false
        });

        this.powerUpGroup.add(powerUp);
        // Call powerUpSpawn on a random delay
        let delay = (Phaser.Math.Between(6000,6500));
        if (this.p1Astronaut.ACCELERATION < 500) {
            this.time.delayedCall(delay, this.powerUpSpawn, [], this);
        }      
    }

    // asteroid spawn loop
    asteroidSpawn() {
        // Add asteroid
        var asteroid = new Asteroid(this, this.asteroidVELOCITY 
            * (Math.random() * (1.3 - 1) + 1)).setScale(0.95, 0.95);
        asteroid.rotation += Math.random() * 360;   // asteroid rotation
        this.asteroidGroup.add(asteroid);
        // Call asteroidSpawn on a random delay
        let delay = (Phaser.Math.Between(900,1500)) * (this.fasterDelay);
        this.time.delayedCall(delay, this.asteroidSpawn, [], this);       
    }

    // alien spawn loop
    alienSpawn() {
        // Add asteroid
        var alien = new Alien(this, this.asteroidVELOCITY 
            * (Math.random() * (1.5 - 1.3) + 1.3)).setScale(0.13, 0.13);
        this.alienGroup.add(alien);
        // Call asteroidSpawn on a random delay
        let delay = (Phaser.Math.Between(3500,4000)) * (this.fasterDelay);
        this.time.delayedCall(delay, this.alienSpawn, [], this);
    }

    // pickup spawn loop
    pickupSpawn() {
        // Add pickup
        this.pickup = new PickUp(this, this.pickupVELOCITY 
            * (Math.random() * (1.2 - 0.8) + 0.8)).setScale(0.8, 0.8);
        this.pickup.rotation += Math.random() * 360;   // pickup rotation
        this.pickupGroup.add(this.pickup);
        // Call pickupSpawn on a random delay
        let delay = (Phaser.Math.Between(1500,2000));
        this.time.delayedCall(delay, this.pickupSpawn, [], this);    
    }
    pickupSpawn2() {
        // Add pickup2
        this.pickup2 = new PickUp(this, this.pickupVELOCITY 
            * (Math.random() * (1.1 - 0.7) + 0.7)).setScale(0.8, 0.8);
        this.pickup2.rotation += Math.random() * 360;   // pickup rotation
        this.pickupGroup2.add(this.pickup2);
        // Call pickupSpawn on a random delay
        let delay = (Phaser.Math.Between(1500,2000));
        this.time.delayedCall(delay, this.pickupSpawn2, [], this);    
    }

    // astronaut death
    astronautHit(astronaut, asteroid){
        this.cameras.main.shake(600, 0.04); 
        this.lives --;
        this.livesNumber.text = this.lives;
        this.break.play();
        asteroid.destroy();
        if(this.lives <= 0){
            this.gameOver = true;
            this.time.delayedCall(500, () => {
                this.cameras.main.fadeOut(1500, 0, 0, 0)
            })
            this.time.delayedCall(2000, () => {
                this.p1Astronaut.destroy();
                this.scene.start('gameOverScene');
            })
            this.bgMusic.stop();
        }
    }

    // powerUp death
    powerUpGet(astronaut, powerup){
        this.powerUp.play();
        powerup.destroy();
        if (astronaut.ACCELERATION < 500) {
            astronaut.ACCELERATION += 25;
            this.speedT.text += 'I';
        }
    }

    // pickup death
    pickupGet(astronaut, pickup){
        this.pickups.play();
        pickup.destroy();
        currentScore += 10;
        this.currentScoreT.text = currentScore;
        if(highScore < currentScore){
            highScore = currentScore;
            this.highScoreT.text= currentScore;
        }
    }
    pickupGet2(astronaut, pickup2){
        this.pickups2.play();
        pickup2.destroy();
        currentScore += 10;
        this.currentScoreT.text = currentScore;
        if(highScore < currentScore){
            highScore = currentScore;
            this.highScoreT.text= currentScore;
        }
    }

    update() {
        this.starfield.tilePositionY -= this.starfieldSpeed;

        if(!this.gameOver){
            this.p1Astronaut.update();
        }
        // asteroid rotation
        this.asteroidGroup.rotate(Math.random() * (0.027 - 0.006) + 0.006);

        // pickup rotation
        this.pickupGroup.rotate(Math.random() * (-0.027 - -0.006) + -0.006);
        this.pickupGroup2.rotate(Math.random() * (-0.027 - -0.006) + -0.006);

    }
    
}