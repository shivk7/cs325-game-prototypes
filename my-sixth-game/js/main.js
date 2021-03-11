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
            gravity: { y: 500 },
            debug: true,
        },
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('coins', 'assets/coinGold.png');
    this.load.image('tiles', 'assets/house tiles.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
}
function create() {
    const map = this.make.tilemap({ key: 'map' });
    const platforms = map.createStaticLayer('platform', tileset, 0, 200);
    const platforms = map.createStaticLayer('coin', tileset, 0, 200);

}

function update() {

}