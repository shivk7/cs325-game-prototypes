const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    heigth: 600,
    scene: {
        preload,
        create,
        update,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('coins', 'assets/coinGold.png');
    this.load.image('tiles', 'assets/house tiles.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}
function create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('house tiles', 'tiles');
    const platform = map.createStaticLayer('platform', tileset, 0, 350);

    platform.setCollisionByExclusion(-1, true);

    this.player = this.physics.add.sprite(50, 300, 'player');
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, platform);
}

function update() {

}