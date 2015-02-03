var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('dessin', 'dessins_filo/Des.jpeg');
}

function create() {
	game.add.image(0, 0, 'dessin');
	var text = game.add.text(game.world.centerX, game.world.centerY - 100, "Angry Birds");
	text.anchor.x = 0.5;
	text = game.add.text(game.world.centerX, game.world.centerY, "FILO ANDREAS DORINE");
	text.anchor.x = 0.5;
}

function update() {

}