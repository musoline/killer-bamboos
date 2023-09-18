export default class PreloaderScene extends Phaser.Scene {
	constructor() {
		super("PreloaderScene");
	}

	init() {}

	preload() {
		this.load.setPath("sprites/");

		this.load.image("bamboo", "bamboo.png");
		this.load.image("ground", "ground.png");
		this.load.image("ladder", "ladder.png");
	}

	create() {
		/**
		 * Start Game
		 */
		this.time.delayedCall(1000, () => this.scene.start("GameScene"));
	}
}
