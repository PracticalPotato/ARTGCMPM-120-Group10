class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    create() {
        // add sound volume
        this.break = this.sound.add('sfx_break', {volume: 0.2});
        this.pickups = this.sound.add('sfx_pickups', {volume: 0.3});
        this.pickups2 = this.sound.add('sfx_pickups2', {volume: 0.3});
        // add music
        this.bgMusic = this.sound.add('sfx_2NROBOT', {volume: 0.5});
        this.bgMusic.loop = true;
        this.bgMusic.play();

        // define constants
        this.asteroidVELOCITY = 170;
        this.fasterDelay = 1;
        this.pickupVELOCITY = 150;
        this.lives = 3;
        
        // define keys, declared in main.js
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // add background starfield
        this.starfield = this.add.tileSprite(0, 0, 480, 640, 'starfield2').setOrigin(0, 0);
        this.starfieldSpeed = 1.5;

        // score display
        this.scoreConfig = {
            fontFamily: 'fantasy',
            fontSize: '28px',
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
        this.score = 0;
        this.add.text(20, 17, 'Score:', this.scoreConfig);
        this.scoreT = this.add.text(105, 18, this.score, this.scoreConfig);

        // add astronaut (p1)
        this.p1Astronaut = new Astronaut(this, game.config.width/2, 431, 'astronaut', 0);

        // setup asteroid group
        this.asteroidGroup = this.add.group({
            runchildUpdate: true
        });

        // setup pickup group
        this.pickupGroup = this.add.group({
            runchildUpdate: true
        });
        this.pickupGroup2 = this.add.group({
            runchildUpdate: true
        });

        // start asteroid spawn loop
        this.asteroidSpawn();

        // start pickup spawn loop
        this.pickupSpawn();
        this.pickupSpawn2();

        // game over flag
        this.gameOver = false;

        // collision
        this.physics.add.overlap(this.p1Astronaut, this.asteroidGroup, 
            this.astronautDeath, null, this);
        this.physics.add.overlap(this.p1Astronaut, this.pickupGroup, 
            this.pickupDeath, null, this);
        this.physics.add.overlap(this.p1Astronaut, this.pickupGroup2, 
            this.pickupDeath2, null, this);

        // difficulty increase
        this.timedEvent = this.time.addEvent({ 
            delay: 10000, 
            callback: onEvent, 
            callbackScope: this, 
            //loop: true,
            repeat: 9, 
        });
        function onEvent ()
        {
            if(!this.gameOver){
                this.asteroidVELOCITY += 12.5;
                this.fasterDelay *= 0.94;
                this.starfieldSpeed += 0.3;
            }
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
        let delay = (Phaser.Math.Between(700,1400)) * (this.fasterDelay);
        var timer = this.time.delayedCall(delay, this.asteroidSpawn, [], this);
    }

    // pickup spawn loop
    pickupSpawn() {
        // Add pickup
        this.pickup = new PickUp(this, this.pickupVELOCITY 
            * (Math.random() * (1.2 - 0.8) + 0.8)).setScale(0.8, 0.8);
        this.pickup.rotation += Math.random() * 360;   // pickup rotation
        this.pickupGroup.add(this.pickup);
        // Call pickupSpawn on a random delay
        let delay = (Phaser.Math.Between(2000,3000));
        var timer = this.time.delayedCall(delay, this.pickupSpawn, [], this);    
    }
    pickupSpawn2() {
        // Add pickup2
        this.pickup2 = new PickUp(this, this.pickupVELOCITY 
            * (Math.random() * (1.1 - 0.7) + 0.7)).setScale(0.8, 0.8);
        this.pickup2.rotation += Math.random() * 360;   // pickup rotation
        this.pickupGroup2.add(this.pickup2);
        // Call pickupSpawn on a random delay
        let delay = (Phaser.Math.Between(2000,3000));
        var timer = this.time.delayedCall(delay, this.pickupSpawn2, [], this);    
    }

    // astronaut death
    astronautDeath(astronaut, asteroid){
        this.cameras.main.shake(1500, 0.08); 
        this.lives --;
        console.log(this.lives);
        this.break.play();
        asteroid.destroy();
        if(this.lives <= 0){
            this.gameOver = true;
            this.p1Astronaut.destroy();
            this.scene.start('gameOverScene');
            this.bgMusic.stop();
        }
    }

    // pickup death
    pickupDeath(astronaut, pickup){
        this.pickups.play();
        pickup.destroy();
        this.score += 10;
        this.scoreT.text = this.score;
    }
    pickupDeath2(astronaut, pickup2){
        this.pickups2.play();
        pickup2.destroy();
        this.score += 10;
        this.scoreT.text = this.score;
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