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
var player;
var cursors;
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


    this.physics.world.bounds.width = 1600;
    this.physics.world.bounds.height = 600;

    player = this.physics.add.sprite(50, 300, 'player');
    player.setBounce(0.1);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platform);

    this.cameras.main.setBounds(0, 0, 1600, 600);
    this.cameras.main.startFollow(player);
    this.cameras.main.setBackgroundColor('#ccccff'); 

    this.cursors = this.input.keyboard.createCursorKeys();

    //Gives player turning left animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    })

    //Gives player turn animations
    this.anims.create({
        key: 'turn',
        frames: [{ key: 'player', frame: 4 }],
        frameRate: 10
    });

    //Gives player truning right animations
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });


}

function update() {
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
        player.setVelocityX(-600);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(600);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(600);
    }
    
}