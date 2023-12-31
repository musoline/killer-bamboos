import GameScene from "./scenes/GameScene";
import {EAnimationName} from "@/enums/EAnimationName";
import {EGameResult} from "@/enums/EGameResult";
import {EGrowState} from "@/enums/EGrowState";
import {TEGrowState} from "@/types/TEGrowState";
import {TimeUtil} from "@/utils/TimeUtil";

export class BambooObstacle extends Phaser.GameObjects.Container {
	scene: GameScene;
	positionX: number;
	positionY: number;
	collisionHeight: number = 0;
	bamboo: Phaser.GameObjects.Sprite;
	bomb: any;
	graphics: Phaser.GameObjects.Graphics;
	exploded: boolean;
	growState: TEGrowState = EGrowState.UP;
	play: boolean = false;
	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		this.positionX = x;
		this.positionY = y;

		this.init();
		setTimeout(() => {
			this.play = true;
		}, TimeUtil.getRandomSecond(1, 8));
	}
	init(): void {
		this.scene.add.existing(this);

		this.scene.physics.world.enable(this);
		//@ts-ignore
		this.body.setSize(40, this.collisionHeight, true);
		this.setSize(40, 130);
		this.setDepth(1);
		this.createBamboo();
		this.createBomb();
		this.createBombAnimation();
		this.createMask();

		this.makeCollide();

		this.setCustomMask();
	}
	makeCollide() {
		this.scene.physics.add.collider(this.scene.character, this, (character: any, bamboo: any) => {
			this.exploded = true;

			this.scene.setGameResult(EGameResult.LOST);
			this.clearMask();
			this.bomb.setPosition(-33, -103);
			//@ts-ignore
			this.body?.velocity.x = 0;
			//@ts-ignore
			this.body?.velocity.y = 0;
			this.bomb.anims.play(EAnimationName.BOMB, true);
		});
	}

	createBamboo(): void {
		this.bamboo = this.scene.add.sprite(20, 65, "bamboo").setScale(0.5).setOrigin(1, 1);
		this.add(this.bamboo);
	}
	createBomb(): void {
		this.bomb = this.scene.add.sprite(35, -35, "bomb", "bomb-anim-0.png").setOrigin(1, 1).setScale(0.4);
		this.add(this.bomb);
	}

	createBombAnimation() {
		if (this.scene.anims.get(EAnimationName.BOMB) !== undefined) return;
		this.scene.anims.create({
			key: `bomb`,
			frames: this.scene.anims.generateFrameNames(`bomb`, {
				prefix: `bomb-anim-`,
				start: 0,
				end: 11,
				suffix: ".png"
			}),
			frameRate: 7,
			repeat: -1
		});
	}

	createMask() {
		this.graphics = this.scene.add.graphics();
		const color = 0x00ffff;
		const thickness = 2;
		const alpha = 1;
		this.graphics.lineStyle(thickness, color, alpha);
		this.graphics.strokeRect(this.positionX - 20, this.positionY - 65, 40, 0); //40-40  130-0
		this.graphics.fillStyle(color, 0);
		this.graphics.fillRect(this.positionX - 20, this.positionY - 65, 40, 0); //40-40  130-0
	}

	setCustomMask() {
		this.mask = new Phaser.Display.Masks.GeometryMask(this.scene, this.graphics);
	}

	update(time: any, delta: any): void {
		if (
			(this.growState === EGrowState.UP
				? this.collisionHeight < this.getBounds().height - 30
				: this.collisionHeight > 0) &&
			!this.exploded &&
			this.play
		) {
			this.growState === EGrowState.UP ? this.collisionHeight++ : this.collisionHeight--;

			//@ts-ignore
			this.body.setSize(40, this.collisionHeight, true);

			this.graphics.clear();
			this.graphics.strokeRect(
				this.positionX - 20,
				this.positionY - 65 - this.collisionHeight,
				40,
				this.collisionHeight
			);
			this.graphics.fillRect(
				this.positionX - 20,
				this.positionY - 65 - this.collisionHeight,
				40,
				this.collisionHeight
			);
			this.setPosition(this.positionX, this.positionY - this.collisionHeight);
			if (this.collisionHeight === (this.growState === EGrowState.UP ? this.getBounds().height - 30 : 0)) {
				this.growState = this.growState === EGrowState.DOWN ? EGrowState.UP : EGrowState.DOWN;
				this.makeBrake();
			}
		}
	}
	makeBrake() {
		this.play = false;
		setTimeout(() => {
			this.play = true;
		}, TimeUtil.getRandomSecond(1, 10));
	}
}
