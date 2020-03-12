import config from '../config/config';
import gameSettings from '../config/gameSettings';

export default class Scene2 extends Phaser.Scene {
	constructor() {
		super('playGame');
	}
	create() {
		this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
		this.background.setOrigin(0, 0);

		// this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, 'ship1');
		// this.ship2 = this.add.sprite(config.width / 2, config.height / 2, 'ship2');
		// this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, 'ship3');
		this.ship1 = this.add.image(config.width / 2 - 50, config.height / 2, 'ship1');
		this.ship2 = this.add.image(config.width / 2, config.height / 2, 'ship2');
		this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, 'ship3');
		this.ship4 = this.add.image(config.width / 2 - 100, config.height / 2, 'ship4');
		this.ship5 = this.add.image(config.width / 2 + 100, config.height / 2, 'ship5');

		this.powerUps = this.physics.add.group();
		this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, 'player');
		this.player.play('thrust');
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.player.setCollideWorldBounds(true);
		this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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

		// this.ship1.play('ship1_anim');
		// this.ship2.play('ship2_anim');
		// this.ship3.play('ship3_anim');

		// this.ship1.setScale(2);
		// this.ship2.setScale(2);
		// this.ship3.setScale(2);
		this.ship1.setScale(0.2);
		this.ship2.setScale(0.2);
		this.ship3.setScale(0.2);
		this.ship4.setScale(0.2);
		this.ship5.setScale(0.2);
		this.player.setScale(3);

		// this.ship2.flipY = true;
		// this.ship1.flipY = true;
		// this.ship3.flipY = true;
		this.ship4.flipY = true;
		this.ship5.flipY = true;

		this.ship1.setInteractive();
		this.ship2.setInteractive();
		this.ship3.setInteractive();

		this.input.on('gameobjectdown', this.destroyShip, this);

		// this.add.text(20, 20, 'Playing game', { font: '25px Arial', fill: 'yellow' });
	}

	moveShip(ship, speed) {
		ship.y += speed;
		if (ship.y > config.height) {
			this.resetShipPos(ship);
		}
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

	update() {
		this.moveShip(this.ship1, 1);
		this.moveShip(this.ship2, 3);
		this.moveShip(this.ship3, 2);
		this.moveShip(this.ship4, 2.5);
		this.moveShip(this.ship5, 1.5);
		this.background.tilePositionY -= 0.5;
		this.movePlayerManager();
		if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
			console.log('Fire!');
		}
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
