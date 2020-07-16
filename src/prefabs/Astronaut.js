// Rocket prefab
class Astronaut extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);

    }

    update() {
        // left/right/up/down movement
        if(keyLEFT.isDown && this.x >= 1) {
            this.x -= 2;
        }
        if(keyRIGHT.isDown && this.x <= 588) {
            this.x += 2;
        }
        if(keyUP.isDown && this.y >= 1) {
            this.y -= 2;
        }
        if(keyDOWN.isDown && this.y <= 427) {
            this.y += 2;
        }
            
        
       
    }
// reset rocket to "ground"
    reset() {
       
    }
}