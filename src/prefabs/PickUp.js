// PickUp prefab, used in Play.js
class PickUp extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity){
        super(scene, (Math.floor(Math.random() * (game.config.width - 0 + 1) + 0)), 
        -70, 'pickup', 0);

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