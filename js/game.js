//use strict;
var game = new Phaser.Game(1024, 576, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursors;
var transformer_1;

function resizePolygon(originalPhysicsKey, newPhysicsKey, shapeKey, scale)
{
	var newData = [];
	var data = game.cache.getPhysicsData(originalPhysicsKey, shapeKey);
	for (var i = 0; i < data.length; i++) {
		var vertices = [];
		for (var j = 0; j < data[i].shape.length; j += 2) {
			vertices[j] = data[i].shape[j] * scale;
			vertices[j+1] = data[i].shape[j+1] * scale;
		}
		newData.push({shape : vertices});
	}
	var item = {};
	item[shapeKey] = newData;
	game.load.physics(newPhysicsKey, '', item);
}

function preload() {
    game.load.image('fond', 'assets/img/fond_papier.png');
    game.load.image('caisse_1', 'assets/img/caisse_1.png');
    game.load.image('caisse_2', 'assets/img/caisse_2.png');
    game.load.image('caisse_3', 'assets/img/caisse_3.png');
    game.load.image('cochon_1', 'assets/img/cochon_1.png');
    game.load.physics('cochon_1_poly', 'assets/physics/cochon_1.json');
    game.load.image('cochon_2', 'assets/img/cochon_2.png');
    game.load.image('angry_birds_1', 'assets/img/angry_birds_1.png');
    game.load.image('soleil', 'assets/img/soleil.png');
    game.load.image('planete_verte', 'assets/img/planete_verte.png');
    game.load.image('nuage_1', 'assets/img/nuage_1.png');
    game.load.image('nuage_2', 'assets/img/nuage_2.png');
    game.load.image('eclair_1', 'assets/img/eclair_1.png');
    game.load.image('catapulte', 'assets/img/catapulte.png');
    game.load.image('transformer_1', 'assets/img/transformer_1.png');
    game.load.image('rayon_bleu_1', 'assets/img/rayon_bleu_1.png');
}

var curseur_souris;
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

	var text = game.add.text(20, 20, "Angry Birds - FILO ANDREAS DORINE");

	//Mise en place des caisses
    var ennemiCollisionGroup = game.physics.p2.createCollisionGroup();
	var caisse;
	for(var i = 0; i < 3 ; i++){
		caisse = game.add.sprite(700, 350+i*100, 'caisse_' + (i+1));
		caisse.scale.set(0.1, 0.1);
		game.physics.p2.enable(caisse);
		//caisse.body.setCollisionGroup(ennemiCollisionGroup);
		//caisse.body.collideWorldBounds = true;
	}

	//Mise en place du personnage
	transformer_1 = game.add.sprite(200, 400, 'transformer_1');
	transformer_1.scale.set(0.3, 0.3);
	game.physics.p2.enable(transformer_1);

	//Création du cochon
	var cochon = game.add.sprite(700, 200, 'cochon_1');
	resizePolygon('cochon_1_poly', 'cochon_1_poly_s', 'cochon_1', 0.3);
	cochon.scale.set(0.3, 0.3);
	game.physics.p2.enable(cochon);
	cochon.body.clearShapes();
	cochon.body.loadPolygon('cochon_1_poly_s', 'cochon_1');
	//cochon.body.setCollisionGroup(ennemiCollisionGroup);

	//Pointeur de la souris
	curseur_souris = game.add.image(0,0, 'planete_verte');
	curseur_souris.scale.set(0.3, 0.3);
	curseur_souris.anchor.set(0.5, 0.5);
	game.input.moveCallback = onMouseMove;
}


function onMouseMove(pointer, x, y){
	curseur_souris.position.set(x, y);
}

var firstTime = true;
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

	if (game.input.mousePointer.isDown && firstTime) {
		//Pas encore trouvé comment gérer le simple clic ??
		firstTime = false;
		var diffHeight = game.input.mousePointer.position.y - transformer_1.position.y;
		console.log(diffHeight);

		var rayon = game.add.sprite(transformer_1.position.x +100, transformer_1.position.y, 'rayon_bleu_1');
		//rayon.rotation = 1;
		game.physics.p2.enable(rayon);
		rayon.body.velocity.x = 1000;
		rayon.body.velocity.y = diffHeight * 3.5;
		//Hacky : supprimme le rayon au bout de 2s, je n'arrive pas encore a bien gérer les groupes de collision
		window.setTimeout(function(){rayon.destroy()}, 1000);
		//rayon.body.collides(ennemiCollisionGroup, function(){ rayon.destroy();}, this);
		//rayon.body.rotation = 1;
	}
	else if(game.input.mousePointer.isUp && !firstTime){
		firstTime = true;
	}
}