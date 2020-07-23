// Asteroid prefab, used in Play.js
class Asteroid extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity){
        // Could be a better way to access random asteroid sprites. -Calvin
        super(scene, Phaser.Math.Between(0, game.config.width), -100,
            'asteroid' + Phaser.Math.Between(1, 3));

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this)

        // config the physics
        this.setImmovable();
        this.setVelocityY(velocity);
        this.body.setCircle(this.displayHeight/2);

    }

    update() {
        if(this.y <= -this.height){
            this.destroy();
        }
    }

    //reset() {
        //this.x = game.config.width;
    //}
        
}