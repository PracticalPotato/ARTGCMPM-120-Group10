// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);

    }

    update() {
        // move spaceship left
        this.x -= game.settings.spaceshipSpeed;
        // wraparound from left to right edge
        if(this.x <= 0 - this.width){
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
        
}