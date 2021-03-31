import "./phaser.js";




var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    input: {
        gamepad: true
    },
};
//variables
var game = new Phaser.Game(config);
var platform;
var platform2;
var player;
var cursors;
var coin;
var coin2;
var loot;
var score = 0;
var scoreText;

function preload() {
    //this is the part where you insert all your images and sprites.
    this.load.image('sky', 'assets/sky.png');
    this.load.image('coin', 'assets/diamond.png');
    this.load.image('coin2', 'assets/diamond2.png');
    this.load.image('loot', 'assets/loot.png');
    this.load.image('floor', 'assets/ground.png');
    this.load.image('platform', 'assets/platform2.png');
    this.load.image('bomb', 'assets/bomb.png')
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

}

function create() {
    //backgoruand needs to be first here, if you don't then the other images will be coverd up.
    this.add.image(400, 300, 'sky');
    //platforms

    platform = this.physics.add.staticGroup();
    platform2 = this.physics.add.staticGroup();

    platform.create(400, 572, 'floor').setScale(2).refreshBody();
    platform.create(1200, 572, 'floor').setScale(2).refreshBody();
    platform.create(400, -30, 'floor').setScale(2).refreshBody();
    platform.create(1200, -30, 'floor').setScale(2).refreshBody();

    platform2.create(30, 519, 'platform');
    platform2.create(30, 499, 'platform');
    platform2.create(30, 479, 'platform');
    platform2.create(30, 459, 'platform');
    platform2.create(30, 439, 'platform');
    platform2.create(30, 419, 'platform');
    platform2.create(30, 399, 'platform');
    platform2.create(30, 379, 'platform');
    platform2.create(30, 359, 'platform');
    platform2.create(30, 339, 'platform');
    platform2.create(30, 319, 'platform');
    platform2.create(30, 299, 'platform');
    platform2.create(30, 279, 'platform');
    platform2.create(30, 259, 'platform');
    platform2.create(30, 239, 'platform');
    platform2.create(30, 219, 'platform');
    platform2.create(30, 199, 'platform');
    platform2.create(30, 179, 'platform');
    platform2.create(30, 159, 'platform');
    platform2.create(30, 139, 'platform');
    platform2.create(30, 119, 'platform');
    platform2.create(30, 99, 'platform');
    platform2.create(30, 79, 'platform');
    platform2.create(30, 59, 'platform');
    platform2.create(30, 39, 'platform');
    platform2.create(30, 19, 'platform');
    platform2.create(30, 9, 'platform');
    //other side

    platform2.create(1580, 519, 'platform');
    platform2.create(1580, 499, 'platform');
    platform2.create(1580, 479, 'platform');
    platform2.create(1580, 459, 'platform');
    platform2.create(1580, 439, 'platform');
    platform2.create(1580, 419, 'platform');
    platform2.create(1580, 399, 'platform');
    platform2.create(1580, 379, 'platform');
    platform2.create(1580, 359, 'platform');
    platform2.create(1580, 339, 'platform');
    platform2.create(1580, 319, 'platform');
    platform2.create(1580, 299, 'platform');
    platform2.create(1580, 279, 'platform');
    platform2.create(1580, 259, 'platform');
    platform2.create(1580, 239, 'platform');
    platform2.create(1580, 219, 'platform');
    platform2.create(1580, 199, 'platform');
    platform2.create(1580, 179, 'platform');
    platform2.create(1580, 159, 'platform');
    platform2.create(1580, 139, 'platform');
    platform2.create(1580, 119, 'platform');
    platform2.create(1580, 99, 'platform');
    platform2.create(1580, 79, 'platform');
    platform2.create(1580, 59, 'platform');
    platform2.create(1580, 39, 'platform');
    platform2.create(1580, 19, 'platform');
    platform2.create(1580, 9, 'platform');
    // chalenge

    platform2.create(200, 519, 'platform');
    platform2.create(200, 489, 'platform');
    platform2.create(200, 459, 'platform');

    platform2.create(100, 120, 'platform');
    platform2.create(170, 120, 'platform');

    platform2.create(300, 300, 'platform');

    platform2.create(400, 120, 'platform');
    platform2.create(470, 120, 'platform');
    platform2.create(540, 120, 'platform');

    platform2.create(600, 520, 'platform');
    platform2.create(600, 490, 'platform');
    platform2.create(600, 460, 'platform');

    platform2.create(1000, 200, 'platform');
    platform2.create(1070, 200, 'platform');
    platform2.create(1140, 200, 'platform');

    //player

    //creates the player
    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.1);
    //Gives player turning left animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    })

    //Gives player turn animations
    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 10
    });

    //Gives player truning right animations
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //Physics
    player.body.setGravityY(300)
    this.physics.add.collider(player, platform);
    this.physics.add.collider(player, platform2);

    //camera
    this.cameras.main.setBounds(0, 0, 1600, 600)
    this.cameras.main.startFollow(player);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //coin
    coin = this.physics.add.group({
        key: 'coin',
        repeat: 6,
        setXY: { x: 100, y: 30, stepX: 65 }
    });

    coin.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.2));

    });

    this.physics.add.collider(coin, platform2);
    this.physics.add.overlap(player, coin, collectCoin, null, this);
    function collectCoin(player, Coin) {
        Coin.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);
    }

    //Coin 2
    coin2 = this.physics.add.group({
        key: 'coin2',
        repeat: 1,
        setXY: { x: 600, y: 20, stepX: 470 }
    });

    coin2.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.2));
    });
    this.physics.add.collider(coin2, platform2);
    this.physics.add.overlap(player, coin2, collectCoin2, null, this);

    function collectCoin2(player, Coin2) {
        Coin2.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);
    }
    //loot
    loot = this.physics.add.group({
        key: 'loot',
        repeat: 0,
        setXY: { x: 1520, y: 400, stepX: 0 }
    });

    loot.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.2));

    });

    this.physics.add.collider(loot, platform);
    this.physics.add.overlap(player, loot, collectLoot, null, this);
    function collectLoot(player, loot) {
        loot.disableBody(true, true);
        score += 110;
        scoreText.setText('Score: ' + score);
    }

}


function update() {
    scoreText.x = player.body.position.x;

    //keyboard
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
        player.setVelocityX((Math.random() * -800) - 2);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX((Math.random() * 800) + 1);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY((Math.random() * -600) - 100);
    }
}
