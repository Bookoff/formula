var game = new Phaser.Game(400, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});

function preload() {
    game.load.image('car', 'assets/car.png');
    game.load.image('stone', 'assets/stone.png');
}

var car;
var stones;
var cursors;
var time;

function create() {
    car = game.add.sprite(187, 450, 'car');
    car.body.collideWorldBounds = true;

    // The stones group contains the obstacles the car should avoid
    stones = game.add.group();
    stones.createMultiple(24, 'stone');
    stones.setAll('outOfBoundsKill', true);

    // Keyboard controls
    cursors = game.input.keyboard.createCursorKeys();

    // Add stones to the game every 2 seconds
    timer = game.time.events.loop(2000, add_stones, this);
}

function update() {

    // Reset car velocity movement
    car.body.velocity.x = 0;

    // Collide the car with the stones
    game.physics.collide(car, stones);

    //  Move to the left
    if (cursors.left.isDown)
    {
        car.body.velocity.x = -300;
    }

    //  Move to the right
    if (cursors.right.isDown)
    {
        car.body.velocity.x = 300;
    }
}

function add_stone(x, y){
    var stone = stones.getFirstDead();
    stone.reset(x, y);
    stone.body.velocity.y = 200;
}

function add_stones() {
    var hole = Math.floor(Math.random()*8);
    for (var i = 0; i < 8; i++)
        if (i != hole) 
            add_stone(i*50, 0);  
}

function restart() {
    // Stop the timer
    game.time.events.remove(timer);

    game.state.start();
}