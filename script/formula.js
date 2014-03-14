var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game',
    { preload: preload, create: create, update: update });

function preload() {
    game.load.image('car', 'assets/car.png');
}

function create() {
    this.car_sprite = game.add.sprite(400, 400, 'car');
    this.car_sprite.body.velocity.y=-50;
}

function update() {
    this.car_sprite.angle += 1;
}