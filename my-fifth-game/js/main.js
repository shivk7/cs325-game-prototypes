import "./phaser.js";

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    heigth: 640,
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

// Create the game instance
const game = new Phaser.Game(config);