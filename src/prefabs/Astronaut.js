// Astronaut prefab, used in Play.js
class Astronaut extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // define acceleration
        this.ACCELERATION = 350;
        
        // define drag constant
        this.DRAG_MULTI = 0.97;

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // config the physics
        this.setImmovable();
        this.setCollideWorldBounds(true);
        this.setBounce(.5, .5);
        //this.setMaxVelocity(this.MAX_VELOCITY);
        this.body.setSize(this.displayWidth*0.9, this.displayHeight*0.9)

        // dash settings
        this.canDash = true;
        this.DASH_COOLDOWN = 500;
        this.DASH_VELOCITY = 350;
    }

    update() {
        // set sprite and invuln state based on movement
        if (this.body.velocity.x > 50) {
            this.setFrame(1);
            this.setFlipX(false);
        } else if (this.body.velocity.x < -50) {
            this.setFrame(1);
            this.setFlipX(true);
        } else {
            this.setFrame(0);
        }

        // physics-based normal movement
        if(keyLEFT.isDown) {
            this.body.acceleration.x = -this.ACCELERATION;
        } else if(keyRIGHT.isDown) {
            this.body.acceleration.x = this.ACCELERATION;
        } else {
            this.body.acceleration.x = 0;
        }
        
        if(keyUP.isDown) {
            this.body.acceleration.y = -this.ACCELERATION;
        } else if(keyDOWN.isDown) {
            this.body.acceleration.y = this.ACCELERATION;
        } else {
            this.body.acceleration.y = 0;
        }

        // Dashing
        if (keySPACE.isDown && this.canDash) {
            if(keyLEFT.isDown || keyRIGHT.isDown || keyUP.isDown || keyDOWN.isDown) {
                this.canDash = false;
                this.scene.time.delayedCall(this.DASH_COOLDOWN, ()=>{this.canDash = true}, [], this);
                if(keyLEFT.isDown) {
                    this.body.setVelocityX(-this.DASH_VELOCITY);
                } else if (keyRIGHT.isDown) {
                    this.body.setVelocityX(this.DASH_VELOCITY);
                }
                if(keyUP.isDown) {
                    this.body.setVelocityY(-this.DASH_VELOCITY);
                } else if(keyDOWN.isDown) {
                    this.body.setVelocityY(this.DASH_VELOCITY);
                }
            }
        }

        // self-implemented drag
        this.setVelocity(this.body.velocity.x*this.DRAG_MULTI, this.body.velocity.y*this.DRAG_MULTI);   
    }
}