import "./phaser.js";
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet('dice', 'assets/dice.png', { frameWidth: 64, frameHeight: 64 });
}

function create() {
    const dice = this.add.sprite(200, 300, 'dice')

    this.input.on('pointerdown', () => {
        this.tweens.addCounter({
            duration: 200,
            repeat: 10,
            onRepeat: () => {
                const frame = Phaser.Math.Between(1, 6);
                dice.setFrame(frame);
            }
        });
    });

}

function update() {
}