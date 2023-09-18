import GameScene from "@/ui/scenes/GameScene";

export class Ground extends Phaser.Physics.Arcade.Sprite {
	body: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody;
	height: number;
	position: number;
	x: number;
	y: number;
	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y, "ground");
		this.x = x;
		this.y = y;
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setDepth(10);
		// this.body.gravity.x = -100;
	}
}
