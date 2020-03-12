import Scene1 from '../scenes/Scene1';
import Scene2 from '../scenes/Scene2';
export default {
	type: Phaser.AUTO, // Specify the underlying browser rendering engine (AUTO, CANVAS, WEBGL)
	// AUTO will attempt to use WEBGL, but if not available it'll default to CANVAS
	width: 2000, // Game width in pixels
	height: 800, // Game height in pixels
	backgroundColor: 0x222fff,
	scene: [ Scene1, Scene2 ],
	pixelArt: true
};
