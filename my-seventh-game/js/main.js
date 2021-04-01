// the game itself
var game;

// global object with game options
var gameOptions = {

    // flipping speed in milliseconds
    flipSpeed: 200,

    // flipping zoom ratio. Simulates the card to be raised when flipping
    flipZoom: 1.2
}
window.onload = function() {

    // creation of a 500x500 pixels game
    game = new Phaser.Game(500, 500);

    // game states
    game.state.add("PlayGame", playGame);
    game.state.start("PlayGame");
}

var playGame = function(game){}
playGame.prototype = {
    preload: function(){

        // making the game cover the biggest window area possible while showing all content
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        // changing background colors
        game.stage.backgroundColor = 0x448844;

        // card sprite sheet
        game.load.spritesheet("cards", "cards.png", 167, 243);

    },
    create: function(){

        // adding the card
        this.card =  game.add.sprite(game.width / 2, game.height / 2, "cards", 0);

        // setting card anchor points to its center
        this.card.anchor.set(0.5);

        // custom property to tell us if the card is flipping. It's not, at the moment.
        this.card.isFlipping = false;

        // waiting for player input
        game.input.onDown.add(function(){

            // if the card is not flipping...
            if(!this.card.isFlipping){

                // it's flipping now!
                this.card.isFlipping = true;

                // start the first of the two flipping animations
                this.flipTween.start();
            }
        }, this);

        // first tween: we raise and flip the card
        this.flipTween = game.add.tween(this.card.scale).to({
            x: 0,
            y: gameOptions.flipZoom
        }, gameOptions.flipSpeed / 2, Phaser.Easing.Linear.None);

        // once the card is flipped, we change its frame and call the second tween
        this.flipTween.onComplete.add(function(){
            this.card.frame = 1 - this.card.frame;
            this.backFlipTween.start();
        }, this);

        // second tween: we complete the flip and lower the card
        this.backFlipTween = game.add.tween(this.card.scale).to({
            x: 1,
            y: 1
        }, gameOptions.flipSpeed / 2, Phaser.Easing.Linear.None);

        // once the card has been placed down on the table, we can flip it again
        this.backFlipTween.onComplete.add(function(){
            this.card.isFlipping = false;
        }, this);
    }
}
