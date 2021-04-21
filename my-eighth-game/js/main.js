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
    this.load.spritesheet('dice', 'assets/dice.png', { frameWidth: 600, frameHeight: 100, endFrame: 6 });
}

function create() {

    const config1 = {
        key: 'explode1',
        frames: 'dice',
        frameRate: 20,
        repeat: -1
}

function update() {
}