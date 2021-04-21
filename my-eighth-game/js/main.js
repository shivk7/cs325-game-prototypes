import "./phaser.js";
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
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
        const dice1 = this.add.sprite(400, 300, 'dice')
        const dice2 = this.add.sprite(600, 300, 'dice')
        const dice3 = this.add.sprite(200, 300, 'dice')
        const dice4 = this.add.sprite(300, 600, 'dice')
        const dice5 = this.add.sprite(500, 600, 'dice')

        this.input.on('pointerdown', () => {
            this.tweens.addCounter({
                duration: 200,
                repeat: 10,
                onRepeat: () => {
                    dice1.setFrame(Phaser.Math.Between(0, 6));
                    dice2.setFrame(Phaser.Math.Between(0, 6));
                    dice3.setFrame(Phaser.Math.Between(0, 6));
                    dice4.setFrame(Phaser.Math.Between(0, 6));
                    dice5.setFrame(Phaser.Math.Between(0, 6));
                }
            });
        });

    }

    function update() {
    }