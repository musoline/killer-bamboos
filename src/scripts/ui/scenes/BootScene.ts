export default class BootScene extends Phaser.Scene {
	constructor() {
		super("BootScene");
	}

	preload() {}

	create() {
		this.scene.start("PreloaderScene");
	}
}
