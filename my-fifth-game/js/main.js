import "./phaser.js";

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    heigth: 600,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload,
        create,
        update,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false
        },
    }
};

const game = new Phaser.Game(config);

function preload() { }

function create() { }

function update() { }