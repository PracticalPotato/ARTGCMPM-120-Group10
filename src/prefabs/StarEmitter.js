// UNUSED BUT SAVED FOR FUTURE PARTICLES?
// STAR.PNG ALSO NOT USED

// StarEmitter prefab
class StarEmitter extends Phaser.GameObjects.Particles.ParticleEmitterManager{
    constructor(scene){
        super(scene, 'starpixel');
        scene.add.existing(this);

        // create line across top of screen for particles source
        let line = new Phaser.Geom.Line(0, 0, game.config.width, 0);
        this.createEmitter({
            speedY: 2,
            lifespan: 5000,
            emitZone: { type: 'random', source: line, quantity: 150 },
            blendMode: 'ADD'
        });
    }
}