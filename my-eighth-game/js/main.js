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
    this.load.tilemapTiledJSON('map', 'assets/s&l_map.json');
    this.load.image('lightBrown', 'assets/light-brown-color-solid-background-1920x1080.png')
    this.load.image('ladders', 'assets/ladder.png')
    this.load.image('darkBrown', 'assets/download.png')
    this.load.image('snakes', 'assets/snake-graphics.png')
}
    function create() {
        const dice1 = this.add.sprite(400, 300, 'dice')
        const dice2 = this.add.sprite(600, 300, 'dice')

        const math1 = this.add.sprite(500, 300, 'math')

        const map = this.make.tilemap({ key: 'map' });

        const tileset = map.addTilesetImage('light-brown-color-solid-background-1920x1080', 'lightBrown');
        const tileset = map.addTilesetImage('ladder', 'ladders');
        const tileset = map.addTilesetImage('snake', 'snakes');
        const tileset = map.addTilesetImage('dark brown', 'darkBrown');

        const board = map.createStaticLayer("board", tileset, 0, 0);
        const ladder = map.createStaticLayer("ladder", tileset, 0, 0);

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