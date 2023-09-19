import GameScene from "@/ui/scenes/GameScene";
import {TECharacterState} from "@/types/TECharacterState";
import {ECharacterState} from "@/enums/ECharacterState";
import {TECharacterDirection} from "@/types/TECharacterDirection";
import {ECharacterDirection} from "@/enums/ECharacterDirection";
import {DATA_FOR_STATE} from "@/data/DataForStates";
import {EAnimationName} from "@/enums/EAnimationName";

export class Character extends Phaser.Physics.Arcade.Sprite {
	characterState: TECharacterState = ECharacterState.IDLE;
	scene: GameScene;
	lockedTo: any;
	isGrounded: boolean;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y, "c-run", "run-0.png");
		this.scene = scene;
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		this.lockedTo = null;
		this.isGrounded = true;
		this.setDepth(10);
		this.setScale(1.5);

	}

	setCharacterState(state: TECharacterState): void {
		this.characterState = state;
		switch (this.characterState) {
			case ECharacterState.IDLE:
				(this.body as Phaser.Physics.Arcade.Body).setAllowGravity(true);
				break;

			case ECharacterState.CLIMB:
				this.body!.stop();
				(this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
				break;
		}
	}

	update(time: any, delta: any) {
		this.isGrounded = (this.body as Phaser.Physics.Arcade.Body).onFloor();
		switch (this.characterState) {
			case ECharacterState.CLIMB:
				if (this.scene.cursors.right.isDown) {
					this.setCharacterState(ECharacterState.IDLE);
				} else if (this.scene.cursors.left.isDown) {
					this.setCharacterState(ECharacterState.IDLE);
				}
				if (this.scene.cursors.up.isDown && this.body!.bottom > this.lockedTo.body.top) {
					this.anims.play(EAnimationName.CLIMB, true);
					this.body!.velocity.y = -160;
				} else if (this.scene.cursors.down.isDown && !this.isGrounded) {
					if (this.body!.top < this.lockedTo.body.bottom) {
						this.anims.play(EAnimationName.CLIMB, true);
						this.body!.velocity.y = 160;
					} else {
						this.setCharacterState(ECharacterState.IDLE);
					}
					if (this.body!.bottom + 30 > this.lockedTo.body.bottom) {
						this.setCharacterState(ECharacterState.IDLE);
					}
				} else {
					this.anims.play(EAnimationName.RUN, true);
					this.body!.velocity.y = 0;
				}

				break;
			case ECharacterState.STOP:
				this.setVelocity(0, 0);
				this.setGravity(0, 0);
				break;
		}

		this.isGrounded = this.isGrounded;
	}
}
