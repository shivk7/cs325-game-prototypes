import "./phaser.js";
var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 1200,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    },
    backgroundColor: '#FFFFFF',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
let player;
var cursors;

function preload() {
    this.load.spritesheet('dice', 'assets/dice.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('math', 'assets/math.png', { frameWidth: 60, frameHeight: 55 });
    this.load.tilemapTiledJSON('map', 'assets/s&l_map.json');
    this.load.image('lightBrown', 'assets/light-brown-color-solid-background-1920x1080.png')
    this.load.image('ladders', 'assets/ladder.png')
    this.load.image('darkBrown', 'assets/download.png')
    this.load.image('snakes', 'assets/snake-graphics.png')
    this.load.image('ggrass', 'assets/grass.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}
    function create() {
        const dice1 = this.add.sprite(400, 1100, 'dice')
        const dice2 = this.add.sprite(600, 1100, 'dice')

        const value1 = Number(dice1.frame.name + 1);
        const value2 = Number(dice2.frame.name + 1);
        const result = value1 - value2;

        const math1 = this.add.sprite(500, 1100, 'math')

        const map = this.make.tilemap({ key: 'map' });

        const tileset5 = map.addTilesetImage('grass', 'ggrass');
        const tileset = map.addTilesetImage('light-brown-color-solid-background-1920x1080', 'lightBrown');
        const tileset2 = map.addTilesetImage('ladder', 'ladders');
        const tileset3 = map.addTilesetImage('snake', 'snakes');
        const tileset4 = map.addTilesetImage('dark brown', 'darkBrown');

        const grasslayer = map.createStaticLayer('grassLayer', tileset5, 0, 0);
        const lightbrown = map.createStaticLayer('lightbrownLayer', tileset, 0, 0);
        const darkbrown = map.createStaticLayer('darkbrownLayer', tileset4, 0, 0);
        const snakelayer = map.createStaticLayer('snakeLayer', tileset3, 0, 0);
        const ladderlayer = map.createStaticLayer('ladderLayer', tileset2, 0, 0);

        grasslayer.setCollisionByProperty({ collides: true });

        const debugGraphics = this.add.graphics().setAlpha(0.75);
        grasslayer.renderDebug(debugGraphics, {
            tileColor: null, 
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), 
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) 
        });

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

        player = this.physics.add.sprite(50, 900, 'dude');

        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        this.physics.add.collider(player, grasslayer);
        cursors = this.input.keyboard.createCursorKeys();
    }

function update() {
    player.body.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-260);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(260);
        player.anims.play('right', true);
    }

    else if (cursors.up.isDown) {
        player.setVelocityY(-260);
        player.anims.play('down', true);
    }
    else if (cursors.down.isDown) {
        player.setVelocityY(260);
        player.anims.play('up', true);
    }
    else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
}