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

		this.load.atlas("c-run", "anims/run.png", "anims/run.json");
		this.load.atlas("c-climb", "anims/climb.png", "anims/climb.json");
		this.load.atlas("c-die", "anims/die.png", "anims/die.json");
		this.load.atlas("c-win", "anims/win.png", "anims/win.json");
		this.load.atlas("bomb", "anims/bomb.png", "anims/bomb.json");
	}

	create() {
		/**
		 * Start Game
		 */
		this.time.delayedCall(1000, () => this.scene.start("GameScene"));
	}
}
