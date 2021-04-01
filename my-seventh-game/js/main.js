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

var card1
var card2
function preload() {
    this.load.image('card1', 'assets/cardBack.png')
    this.load.image('card2', 'assets/cardBack.png')
    this.load.image('cat', 'assets/cat.png')
}

function create() {
    this.add.image(300, 300, 'cat')
    this.add.image(600, 300, 'cat')

    card1 = this.add.image(300, 300, 'card1');
    card2 = this.add.image(600, 300, 'card2');

    this.input.once('pointerdown', function () {

        console.log('nuked');

        card1.destroy();

        card1 = null;

    });

    this.input.once('pointerdown', function () {

        console.log('nuked');

        card2.destroy();

        card2 = null;

    });
}

function update() {
}