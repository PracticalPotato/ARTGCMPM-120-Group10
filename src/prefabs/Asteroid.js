// Asteroid prefab, used in Play.js
class Asteroid extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity){
        // Note: This way of getting a random asteroid seems kind of awkward -Calvin
        super(scene, Phaser.Math.Between(0, game.config.width), -100, 
        'asteroid' + Phaser.Math.Between(1, 3), 0);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this)

        // config the physics
        this.setImmovable();
        this.setVelocityY(velocity);

    }

    update() {
        if(this.y <= -this.height){
            this.destroy();
        }
    }

    reset() {
        this.x = game.config.width;
    }
        
}