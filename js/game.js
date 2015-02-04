//use strict;
var game = new Phaser.Game(1024, 768, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursors;
var transformer_1;
function preload() {
    game.load.image('fond', 'assets/img/fond_papier.png');
    game.load.image('caisse_1', 'assets/img/caisse_1.png');
    game.load.image('caisse_2', 'assets/img/caisse_2.png');
    game.load.image('caisse_3', 'assets/img/caisse_3.png');
    game.load.image('cochon_1', 'assets/img/cochon_1.png');
    game.load.image('cochon_2', 'assets/img/cochon_2.png');
    game.load.image('angry_birds_1', 'assets/img/angry_birds_1.png');
    game.load.image('soleil', 'assets/img/soleil.png');
    game.load.image('planete_verte', 'assets/img/planete_verte.png');
    game.load.image('nuage_1', 'assets/img/nuage_1.png');
    game.load.image('nuage_2', 'assets/img/nuage_2.png');
    game.load.image('eclair_1', 'assets/img/eclair_1.png');
    game.load.image('catapulte', 'assets/img/catapulte.png');
    game.load.image('transformer_1', 'assets/img/transformer_1.png');
}

function create() {
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y = 917;

	cursors = game.input.keyboard.createCursorKeys();

	//Création du décor
	game.add.image(0, 0, 'fond');
	var soleil = game.add.image(800, 100, 'soleil');
	soleil.scale.set(0.3, 0.3);
	var nuage = game.add.image(200, 100, 'nuage_1');
	nuage.scale.set(0.5, 0.5);
	nuage = game.add.image(400, 130, 'nuage_2');
	nuage.scale.set(0.5, 0.5);

	var text = game.add.text(game.world.centerX, game.world.centerY - 100, "Angry Birds");
	text.anchor.x = 0.5;
	text = game.add.text(game.world.centerX, game.world.centerY, "FILO ANDREAS DORINE");
	text.anchor.x = 0.5;

	//Mise en place des caisses
	var caisse;
	for(var i = 0; i < 3 ; i++){
		caisse = game.add.sprite(200 + i*10, 0+i*300, 'caisse_' + (i+1));
		caisse.scale.x = 0.5;
		caisse.scale.y = 0.5;
		body = game.physics.p2.enable(caisse);
	}

	//Mise en place du personnage
	transformer_1 = game.add.sprite(600, 400, 'transformer_1');
	transformer_1.scale.x = 0.5;
	transformer_1.scale.y = 0.5;
	game.physics.p2.enable(transformer_1);
}

function update() {
	if (cursors.left.isDown){
		transformer_1.body.moveLeft(200);
	}
	else if (cursors.right.isDown){
		transformer_1.body.moveRight(200);
	}
	else if(cursors.up.isDown){
		transformer_1.body.moveUp(200);	
	}
}