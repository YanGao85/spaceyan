export default class Explosion extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'explosion');
		scene.add.existing(this);
		this.play('explode');
	}
	update() {
		if (this.y < 12) {
			this.destroy();
		}
	}
}
