// Astronaut prefab, used in Play.js
class Astronaut extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // // define constants (basic movement)
        // this.MOVESPEED = 10;

        // define constants (physics movement)
        this.ACCELERATION = 200;
        this.MAX_VELOCITY = 2.5;
        this.DRAG = 0.96;

        // // define constants (explosive physics movement)
        // this.EXPLOSION_VELOCITY = 2000;
        // this.MAX_VELOCITY = 4000;

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // config the physics
        this.setImmovable();
        this.setCollideWorldBounds(true);
        //this.setBounce(.5, .5);
        this.setDamping(true);
        this.setDrag(this.DRAG);
        //this.setMaxVelocity(this.MAX_VELOCITY);
    }

    update() {
        // // left/right/up/down movement
        // if(keyLEFT.isDown && this.x >= 1) {
        //     this.x -= this.MOVESPEED;
        // }
        // if(keyRIGHT.isDown && this.x <= 588) {
        //     this.x += this.MOVESPEED;
        // }
        // if(keyUP.isDown && this.y >= 1) {
        //     this.y -= this.MOVESPEED;
        // }
        // if(keyDOWN.isDown && this.y <= 427) {
        //     this.y += this.MOVESPEED;
        // }

        // physics-based normal movement
        if(keyLEFT.isDown) {
            this.body.acceleration.x = -this.ACCELERATION;
            this.x -= this.MAX_VELOCITY;
        } else if(keyRIGHT.isDown) {
            this.body.acceleration.x = this.ACCELERATION;
            this.x += this.MAX_VELOCITY;
        } else {
            this.body.acceleration.x = 0;
        }
        
        if(keyUP.isDown) {
            this.body.acceleration.y = -this.ACCELERATION;
            this.y -= this.MAX_VELOCITY;
        } else if(keyDOWN.isDown) {
            this.body.acceleration.y = this.ACCELERATION;
            this.y += this.MAX_VELOCITY;
        } else {
            this.body.acceleration.y = 0;
        }

        // physics-based explosive movement (EXPERIMENTAL)
        // if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //     if(this.body.velocity.x > 300) {
        //         this.body.setVelocityX(0);
        //     } else {
        //         this.body.setVelocityX(-this.MAX_VELOCITY);
        //     }
        // } else if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        //     if(this.body.velocity.x < -300) {
        //         this.body.setVelocityX(0);
        //     } else {
        //         this.body.setVelocityX(this.MAX_VELOCITY);
        //     }
        // }

        /*
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.body.setVelocityX(this.body.velocity.x-this.EXPLOSION_VELOCITY);
        } else if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.body.setVelocityX(this.body.velocity.x+this.EXPLOSION_VELOCITY);
        }
        */
       
    }
// reset rocket to "ground"
    reset() {
       
    }
}