import config from '../config/config';

export default class Scene2 extends Phaser.Scene {
	constructor() {
		super('playGame');
	}
	create() {
		this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
		this.background.setOrigin(0, 0);

		this.ship1 = this.add.image(config.width / 2 - 50, config.height / 2, 'ship1');
		this.ship2 = this.add.image(config.width / 2, config.height / 2, 'ship2');
		this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, 'ship3');
		this.ship4 = this.add.image(config.width / 2 - 100, config.height / 2, 'ship4');
		this.ship5 = this.add.image(config.width / 2 + 100, config.height / 2, 'ship5');

		this.ship1.setScale(0.2);
		this.ship2.setScale(0.2);
		this.ship3.setScale(0.2);
		this.ship4.setScale(0.2);
		this.ship5.setScale(0.2);

		this.ship2.flipY = true;
		this.ship1.flipY = true;
		this.ship3.flipY = true;
		this.ship4.flipY = true;
		this.ship5.flipY = true;

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

	update() {
		this.moveShip(this.ship1, 4);
		this.moveShip(this.ship2, 5);
		this.moveShip(this.ship3, 5);
		this.moveShip(this.ship4, 2.5);
		this.moveShip(this.ship5, 1.5);
		this.background.tilePositionY -= 0.5;
	}
}
