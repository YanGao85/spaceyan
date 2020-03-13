import config from '../config/config';
import gameSettings from '../config/gameSettings';
import Beam from './beam';
import Explosion from './explosion';

export default class Scene2 extends Phaser.Scene {
	constructor() {
		super('playGame');
	}
	create() {
		this.music = this.sound.add('music');
		const musicConfig = {
			mute: false,
			volume: 1,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: false,
			delay: 0
		};
		this.music.play(musicConfig);
		this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
		this.background.setOrigin(0, 0);

		this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, 'ship1');
		this.ship2 = this.add.sprite(config.width / 2, config.height / 2, 'ship2');
		this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, 'ship3');
		// this.ship1 = this.add.image(config.width / 2 - 50, config.height / 2, 'ship1');
		// this.ship2 = this.add.image(config.width / 2, config.height / 2, 'ship2');
		// this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, 'ship3');
		// this.ship4 = this.add.image(config.width / 2 - 100, config.height / 2, 'ship4');
		// this.ship5 = this.add.image(config.width / 2 + 100, config.height / 2, 'ship5');

		this.enemies = this.physics.add.group();
		this.enemies.add(this.ship1);
		this.enemies.add(this.ship2);
		this.enemies.add(this.ship3);

		this.powerUps = this.physics.add.group();
		this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, 'player');
		this.player.play('thrust');
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.player.setCollideWorldBounds(true);
		this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		this.projectiles = this.add.group({
			classType: Beam,
			maxSize: 10,
			runChildUpdate: true
		});
		this.physics.add.collider(this.projectiles, this.powerUps, (projectile, powerUps) => projectile.destroy());
		this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
		this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
		this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

		// Not that necessary
		// const graphics = this.add.graphics();
		// graphics.fillStyle(0xFFFFFF, 1);
		// graphics.beginPath();
		// graphics.moveTo(0, 0);
		// graphics.lineTo(config.width, 0);
		// graphics.lineTo(config.width, 20);
		// graphics.lineTo(0, 20);
		// graphics.lineTo(0, 0);
		// graphics.closePath();
		// graphics.fillPath();

		//maybe try this
		// const graphics = this.add.graphics();
		// graphics.fillStyle("Black");
		// graphics.fillRect(0,0,config.width,20);

		this.score = 0;
		this.scoreLabel = this.add.bitmapText(15, 10, 'pixelFont', 'SCORE', 24);
		const maxObjects = 4;
		for (let i = 0; i <= maxObjects; i++) {
			const powerUp = this.physics.add.sprite(16, 16, 'power-up');
			this.powerUps.add(powerUp);
			powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);
			Math.random() > 0.5 ? powerUp.play('red') : powerUp.play('gray');
			powerUp.setVelocity(100, 100);
			powerUp.setCollideWorldBounds(true);
			powerUp.setBounce(1);
		}

		this.ship1.play('ship1_anim');
		this.ship2.play('ship2_anim');
		this.ship3.play('ship3_anim');

		this.ship1.setScale(2);
		this.ship2.setScale(2);
		this.ship3.setScale(2);
		// this.ship1.setScale(0.2);
		// this.ship2.setScale(0.2);
		// this.ship3.setScale(0.7);
		// this.ship4.setScale(0.2);
		// this.ship5.setScale(0.2);
		this.player.setScale(3);

		// this.ship2.flipY = true;
		// this.ship1.flipY = true;
		// this.ship3.flipY = true;
		// this.ship4.flipY = true;
		// this.ship5.flipY = true;

		this.ship1.setInteractive();
		this.ship2.setInteractive();
		this.ship3.setInteractive();

		this.input.on('gameobjectdown', this.destroyShip, this);

		// this.add.text(20, 20, 'Playing game', { font: '25px Arial', fill: 'yellow' });
		this.beamSound = this.sound.add('audio_beam');
		this.explosionSound = this.sound.add('audio_explosion');
		this.pickupSound = this.sound.add('audio_pickup');
	}

	pickPowerUp(player, powerUp) {
		powerUp.disableBody(true, true);
		this.pickupSound.play();
	}

	moveShip(ship, speed) {
		ship.y += speed;
		if (ship.y > config.height) {
			this.resetShipPos(ship);
		}
	}
	hurtPlayer(player, enemy) {
		this.resetShipPos(enemy);
		if (this.player.alpha < 1) {
			return;
		}
		// player.x = config.width / 2 - 8;
		// player.y = config.height - 64;
		const explosion = new Explosion(this, player.x, player.y);
		player.disableBody(true, true);
		// this.resetPlayer();
		this.time.addEvent({
			delay: 1000,
			callback: this.resetPlayer,
			callbackScope: this,
			loop: false
		});
		this.explosionSound.play();
	}

	resetPlayer() {
		const x = config.width / 2 - 8;
		const y = config.height + 64;
		this.player.enableBody(true, x, y, true, true);
		this.player.alpha = 0.5;

		const tween = this.tweens.add({
			targets: this.player,
			y: config.height - 64,
			ease: 'Power1',
			duration: 1500,
			repeat: 0,
			onComplete: function() {
				this.player.alpha = 1;
			},
			callbackScope: this
		});
	}

	resetShipPos(ship) {
		ship.y = 0;
		const randomX = Phaser.Math.Between(0, config.width);
		ship.x = randomX;
	}

	destroyShip(pointer, gameObject) {
		gameObject.setTexture('explosion');
		gameObject.play('explode');
	}

	hitEnemy(projectile, enemy) {
		const explosion = new Explosion(this, enemy.x, enemy.y);
		// projectile.setTexture('explosion');
		// projectile.play('explode');
		projectile.destroy();
		this.resetShipPos(enemy);
		this.score += 10;
		const formatedScore = this.zeroPad(this.score, 6);
		this.scoreLabel.text = `SCORE ${formatedScore}`;
		this.explosionSound.play();
	}

	update() {
		this.moveShip(this.ship1, 1);
		this.moveShip(this.ship2, 3);
		this.moveShip(this.ship3, 2);
		// this.moveShip(this.ship4, 2.5);
		// this.moveShip(this.ship5, 1.5);
		this.background.tilePositionY -= 0.5;
		this.movePlayerManager();
		if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
			if (this.player.active) this.shootBeam();
		}
		// for (let i = 0; i < this.projectiles.getChildren().length; i++) {
		// 	const beam = this.projectiles.getChildren()[i];
		// 	beam.update();
		// }
	}
	shootBeam() {
		// const beam = this.physics.add.sprite(this.player.x, this.player.y, 'beam');
		const beam = new Beam(this);
		this.beamSound.play();
		// this.projectiles.add(beam);
	}

	zeroPad(number, size) {
		let stringNumber = String(number);
		while (stringNumber.length < (size || 2)) {
			stringNumber = '0' + stringNumber;
		}
		return stringNumber;
	}
	movePlayerManager() {
		// if (this.cursorKeys.spacebar.isDown()) {
		// 	console.log('Fire!');
		// }
		if (this.cursorKeys.left.isDown) this.player.setVelocityX(-gameSettings.playerSpeed);
		else if (this.cursorKeys.right.isDown) this.player.setVelocityX(gameSettings.playerSpeed);
		else this.player.setVelocityX(0);

		if (this.cursorKeys.up.isDown) this.player.setVelocityY(-gameSettings.playerSpeed);
		else if (this.cursorKeys.down.isDown) this.player.setVelocityY(gameSettings.playerSpeed);
		else this.player.setVelocityY(0);
	}
}
