// Asteroid prefab
class Asteroid extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity){
        super(scene, Phaser.Math.Between(0, game.config.width), -100, 'asteroid', 0);
        
        // I wish I could put this somewhere better
        this.setScale(.1);

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