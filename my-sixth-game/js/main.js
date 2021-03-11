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

var cursors;
function preload() {
    this.load.image('coins', 'assets/coinGold.png');
    this.load.image('tiles', 'assets/house tiles.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.atlas('player', 'assets/kenney_player.png', 'assets/kenney_player_atlas.json');
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

    // Create an idle animation i.e the first frame
    this.anims.create({
        key: 'idle',
        frames: [{ key: 'player', frame: 'robo_player_0' }],
        frameRate: 10,
    });

    // Use the second frame of the atlas for jumping
    this.anims.create({
        key: 'jump',
        frames: [{ key: 'player', frame: 'robo_player_1' }],
        frameRate: 10,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    

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
        // If no keys are pressed, the player keeps still
        this.player.setVelocityX(0);
        // Only show the idle animation if the player is footed
        // If this is not included, the player would look idle while jumping
        if (this.player.body.onFloor()) {
            this.player.play('idle', true);
        }
    }

    // Player can jump while walking any direction by pressing the space bar
    // or the 'UP' arrow
    if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
        this.player.setVelocityY(-150);
        this.player.play('jump', true);
    }

    // If the player is moving to the right, keep them facing forward
    if (this.player.body.velocity.x > 0) {
        this.player.setFlipX(false);
    } else if (this.player.body.velocity.x < 0) {
        // otherwise, make them face the other side
        this.player.setFlipX(true);
    }
}