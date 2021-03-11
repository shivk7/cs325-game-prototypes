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
            debug: true,
        },
    }
};

const game = new Phaser.Game(config);

var cursors;
function preload() {
    this.load.image('coins', 'assets/coinGold.png');
    this.load.image('tiles', 'assets/house tiles.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.atlas('player', 'assets/kenney_player.png', 'assets/kenney_player_atlas.json');
    this.load.image('spike', 'assets/spike.png');
}
function create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('house tiles', 'tiles');
    const platform = map.createStaticLayer('platform', tileset, 0, 350);

    platform.setCollisionByExclusion(-1, true);


    this.physics.world.bounds.width = 3200;
    this.physics.world.bounds.height = 800;

    this.player = this.physics.add.sprite(50, 300, 'player');
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, platform);

    this.cameras.main.setBounds(0, 0, 3200, 600);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBackgroundColor('#ccccff'); 

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('player', {
            prefix: 'robo_player_',
            start: 2,
            end: 3,
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'idle',
        frames: [{ key: 'player', frame: 'robo_player_0' }],
        frameRate: 10,
    });

    this.anims.create({
        key: 'jump',
        frames: [{ key: 'player', frame: 'robo_player_1' }],
        frameRate: 10,
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.spikes = this.physics.add.group({
        allowGravity: false,
        immovable: true
    });

    const spikeObjects = map.getObjectLayer('Spikes')['objects'];

    spikeObjects.forEach(spikeObject => {
        const spike = this.spikes.create(spikeObject.x, spikeObject.y + 350 - spikeObject.height, 'spike').setOrigin(0, 0);
    });
}

function update() {
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-200);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true);
        }
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(200);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true);
        }
    } else {
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('idle', true);
        }
    }

    if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
        this.player.setVelocityY(-250);
        this.player.play('jump', true);
    }

    if (this.player.body.velocity.x > 0) {
        this.player.setFlipX(false);
    } else if (this.player.body.velocity.x < 0) {
        this.player.setFlipX(true);
    }
}