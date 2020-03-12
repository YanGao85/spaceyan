export default class Scene1 extends Phaser.Scene {
	constructor() {
		super('bootGame');
	}

	preload() {
		this.load.image('background', 'assets/images/nebula.png');
		this.load.image('ship1', 'assets/images/1.png');
		this.load.image('ship2', 'assets/images/2.png');
		this.load.image('ship3', 'assets/images/3.png');
		this.load.image('ship4', 'assets/images/4.png');
		this.load.image('ship5', 'assets/images/5.png');
	}
	create() {
		// this.add.text(20, 20, 'Loading game...');
		setTimeout(() => {
			this.scene.start('playGame');
		}, 1000);
	}
}
