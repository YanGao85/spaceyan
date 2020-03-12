export default class Scene1 extends Phaser.Scene {
	constructor() {
		super('bootGame');
	}

	preload() {
		this.load.image('background', 'assets/images/nebula.png');
		// this.load.spritesheet('ship1', 'assets/images/ship.png', {
		// 	frameWidth: 16,
		// 	frameHeight: 16
		// });
		// this.load.spritesheet('ship2', 'assets/images/ship2.png', {
		// 	frameWidth: 32,
		// 	frameHeight: 16
		// });
		// this.load.spritesheet('ship3', 'assets/images/ship3.png', {
		// 	frameWidth: 32,
		// 	frameHeight: 32
		// });
		this.load.spritesheet('explosion', 'assets/images/explosion.png', {
			frameWidth: 16,
			frameHeight: 16
		});
		this.load.spritesheet('power-up', 'assets/images/power-up.png', {
			frameWidth: 16,
			frameHeight: 16
		});
		this.load.spritesheet('player', 'assets/images/player.png', {
			frameWidth: 16,
			frameHeight: 24
		});

		this.load.image('ship4', 'assets/images/4.png');
		this.load.image('ship5', 'assets/images/5.png');
		this.load.image('ship3', 'assets/images/3.png');
		this.load.image('ship2', 'assets/images/2.png');
		this.load.image('ship1', 'assets/images/1.png');
	}
	create() {
		// this.add.text(20, 20, 'Loading game...');
		setTimeout(() => {
			this.scene.start('playGame');
		}, 1000);
		this.anims.create({
			key: 'ship1_anim',
			frames: this.anims.generateFrameNumbers('ship1'),
			frameRate: 20,
			repeat: -1
		});
		this.anims.create({
			key: 'ship2_anim',
			frames: this.anims.generateFrameNumbers('ship2'),
			frameRate: 20,
			repeat: -1
		});
		this.anims.create({
			key: 'ship3_anim',
			frames: this.anims.generateFrameNumbers('ship3'),
			frameRate: 20,
			repeat: -1
		});
		this.anims.create({
			key: 'explode',
			frames: this.anims.generateFrameNumbers('explosion'),
			frameRate: 20,
			repeat: 0,
			hideOnComplete: true
		});
		this.anims.create({
			key: 'red',
			frames: this.anims.generateFrameNumbers('power-up', {
				start: 0,
				end: 1
			}),
			frameRate: 20,
			repeat: -1
		});
		this.anims.create({
			key: 'gray',
			frames: this.anims.generateFrameNumbers('power-up', {
				start: 2,
				end: 3
			}),
			frameRate: 20,
			repeat: -1
		});
		this.anims.create({
			key: 'thrust',
			frames: this.anims.generateFrameNumbers('player'),
			frameRate: 20,
			repeat: -1
		});
	}
}
