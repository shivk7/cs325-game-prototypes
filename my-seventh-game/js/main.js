import "./phaser.js";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-game',
    scene: [SceneMain]
};
let game = new Phaser.Game(config);