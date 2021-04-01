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
    this.load.image('card1', 'assets/cardBack.png')
    this.load.image('card2', 'assets/cardBack.png')
    this.load.image('cat', 'assets/cat.png')
}

function create() {
    this.add.image(300, 300, 'cat')
    this.add.image(600, 300, 'cat')

    this.card1 = this.add.image(300, 300, 'card1');
    this.card2 = this.add.image(600, 300, 'card2');

    this.card1.setOrigin(0.5, 0.5);
    this.card2.setOrigin(0.5, 0.5);

    this.input.on('gameobjectdown', this.onClicked.bind(this));
}
onClicked(pointer, objectClicked);{
    objectClicked.destroy();
}


function update() {
}