// Alien prefab, used in Play.js
class Alien extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity){
        super(scene, Phaser.Math.Between(0, game.config.width), -100,
            'alien');

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this)

        // config the physics
        this.setImmovable();
        this.setVelocityY(velocity);

        this.velocityX = Phaser.Math.Between(-20, 20)
        this.setVelocityX(this.velocityX);
        //this.body.setCircle(this.displayHeight/2);

    }

    update() {

    }

        
}