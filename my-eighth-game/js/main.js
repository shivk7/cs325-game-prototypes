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
    this.load.spritesheet('math', 'assets/math.png', { frameWidth: 60, frameHeight: 55 });
    this.load.spritesheet('answer', 'assets/answerButton.png', { frameWidth: 100, frameHeight: 40 });
}
    function create() {
        const dice1 = this.add.sprite(400, 300, 'dice')
        const dice2 = this.add.sprite(600, 300, 'dice')

        const answerButton = this.add.sprite(500, 500, 'answer')
        answerButton.setInteractive();

        answerButton.on('pointerdown', () => { /* do things here */ });
        const math1 = this.add.sprite(500, 300, 'math')
        

        const value1 = Number(dice1.frame.name + 1);
        const value2 = Number(dice2.frame.name + 1);
        const result = value1 - value2;

        this.input.on('pointerdown', () => {
            this.tweens.addCounter({
                duration: 200,
                repeat: 10,
                onRepeat: () => {
                    dice1.setFrame(Phaser.Math.Between(0, 5));
                    dice2.setFrame(Phaser.Math.Between(0, 5));
                    
                    math1.setFrame(Phaser.Math.Between(0, 1));
                }
            });
        });

        
    }

    function update() {
    }