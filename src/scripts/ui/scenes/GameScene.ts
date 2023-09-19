import Game from "@/Game";
import {ECharacterState} from "@/enums/ECharacterState";
import {Character} from "../Character";
import {BambooObstacle} from "../BambooObstacle";
import {EAnimationName} from "@/enums/EAnimationName";
import {TEGameResult} from "@/types/TEGameResult";
import {PlacementUtil} from "@/utils/PlacementUtil";

export default class GameScene extends Phaser.Scene {
	game: Game;
	resultText: Phaser.GameObjects.Text;
	character: Character;
	platforms: Phaser.GameObjects.Group;
	ladders: Phaser.GameObjects.Group;
	cursors: Phaser.Types.Input.Keyboard.CursorKeys;
	detailsState: Phaser.GameObjects.Text;

	bamboosWithBomb: BambooObstacle[];

	gameResult: TEGameResult | null = null;
	constructor() {
		super("GameScene");
	}

	async init() {
		this.cursors = this.input.keyboard!.createCursorKeys();
		this.createBackground();
		this.createCharacter();
		this.createPlatforms();
		this.createLadder();
		this.createUserInputEvents();

		this.createBamboos();
	}
	createBamboos() {
		const bambooWithBomb = [
			{x: 100, y: 1110, t: PlacementUtil.getRandomSecond(1, 5), t_d: PlacementUtil.getRandomSecond(6, 10)},
			{x: 300, y: 1110, t: PlacementUtil.getRandomSecond(3, 10), t_d: PlacementUtil.getRandomSecond(11, 5)},

			{x: 300, y: 900, t: PlacementUtil.getRandomSecond(1, 5), t_d: PlacementUtil.getRandomSecond(6, 10)},
			{x: 500, y: 900, t: PlacementUtil.getRandomSecond(3, 7), t_d: PlacementUtil.getRandomSecond(8, 12)},
			{x: 700, y: 900, t: PlacementUtil.getRandomSecond(1, 5), t_d: PlacementUtil.getRandomSecond(6, 13)},
			{x: 900, y: 900, t: PlacementUtil.getRandomSecond(1, 9), t_d: PlacementUtil.getRandomSecond(10, 13)},
			{x: 1400, y: 900, t: PlacementUtil.getRandomSecond(6, 8), t_d: PlacementUtil.getRandomSecond(8, 21)},

			{x: 100, y: 690, t: PlacementUtil.getRandomSecond(5, 10), t_d: PlacementUtil.getRandomSecond(10, 22)},
			{x: 300, y: 690, t: PlacementUtil.getRandomSecond(5, 10), t_d: PlacementUtil.getRandomSecond(10, 15)},
			{x: 500, y: 690, t: PlacementUtil.getRandomSecond(5, 10), t_d: PlacementUtil.getRandomSecond(15, 25)},
			{x: 900, y: 690, t: PlacementUtil.getRandomSecond(5, 10), t_d: PlacementUtil.getRandomSecond(15, 18)},
			{x: 1300, y: 690, t: PlacementUtil.getRandomSecond(5, 10), t_d: PlacementUtil.getRandomSecond(13, 23)},
			{x: 1500, y: 690, t: PlacementUtil.getRandomSecond(5, 10), t_d: PlacementUtil.getRandomSecond(13, 19)}
		];

		this.bamboosWithBomb = bambooWithBomb.map((bwb) => new BambooObstacle(this, bwb.x, bwb.y, bwb.t, bwb.t_d));
	}

	setGameResult(result: TEGameResult) {
		this.gameResult = result;
		this.character.anims.play(EAnimationName.DIE, true);
	}

	createUserInputEvents() {
		const right = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		const left = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		const down = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		const up = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

		right?.on("down", () => this.characterGoRight());
		right?.on("up", () => this.CharacterStop());

		left?.on("down", () => this.characterGoLeft());
		left?.on("up", () => this.CharacterStop());

		up?.on("down", () => {
			this.character.body!.velocity.y = -400;
			this.character.anims.play(EAnimationName.CLIMB, true);
		});
		up?.on("up", () => {
			this.character.anims.play(EAnimationName.RUN);
			this.character.anims.stop();
		});

		down?.on("down", () => {
			this.character.anims.play(EAnimationName.DIE);
		});
		down?.on("up", () => {});
	}

	characterGoLeft() {
		if (this.gameResult !== null) return;
		this.character.body!.gravity.x = -50;
		this.character.body!.velocity.x = -150;
		// this.character.setFlipX(true).setOrigin(0, 0);
		this.character.anims.play(EAnimationName.RUN, true);
	}

	characterGoRight() {
		if (this.gameResult !== null) return;
		this.character.body!.gravity.x = 50;
		this.character.body!.velocity.x = 150;
		// this.character.setFlipX(false);
		this.character.anims.play(EAnimationName.RUN, true);
	}

	CharacterStop() {
		if (this.gameResult !== null) return;
		this.character.body!.gravity.x = 0;
		this.character.body!.velocity.x = 0;
		this.character.anims.stop();
	}

	createCharacterAnimations() {
		const animationsDetails = [
			{name: EAnimationName.RUN, endFrame: 8},
			{name: EAnimationName.WIN, endFrame: 7},
			{name: EAnimationName.CLIMB, endFrame: 7},
			{name: EAnimationName.DIE, endFrame: 7}
		];

		animationsDetails.forEach((animationDetails) => {
			if (this.anims.get(animationDetails.name) !== undefined) return;

			this.anims.create({
				key: `${animationDetails.name}`,
				frames: this.anims.generateFrameNames(`c-${animationDetails.name}`, {
					prefix: `${animationDetails.name}-`,
					start: 0,
					end: animationDetails.endFrame,
					suffix: ".png"
				}),
				frameRate: 7,
				repeat: -1
			});
		});
	}

	createCharacter() {
		this.character = new Character(this, 200, 800);

		this.createCharacterAnimations();

		this.character.body!.gravity.y = 500;
		this.character.body!.bounce.y = 0.25;
	}

	createPlatforms() {
		this.platforms = this.physics.add.staticGroup();

		this.platforms.add(this.add.tileSprite(1920 / 2, 1060, 1920, 40, "ground"));
		this.platforms.add(this.add.tileSprite(1920 / 2, 850, 1920, 40, "ground"));
		this.platforms.add(this.add.tileSprite(1920 / 2, 640, 1920, 40, "ground"));
		this.platforms.add(this.add.tileSprite(1920 / 2, 430, 1920, 40, "ground"));
		this.platforms.add(this.add.tileSprite(1920 / 2, 220, 1920, 40, "ground"));

		this.platforms.setOrigin(0.5, 0.5).setDepth(2);

		this.physics.add.collider(this.character, this.platforms, undefined, this.passThru, this);
	}

	createLadder() {
		this.ladders = this.physics.add.staticGroup();

		this.ladders.create(420, 940, "ladder").setImmovable(true).refreshBody();
		this.ladders.create(1800, 730, "ladder").setImmovable(true).refreshBody();
		this.ladders.create(200, 520, "ladder").setImmovable(true).refreshBody();
		this.ladders.create(1800, 310, "ladder").setImmovable(true).refreshBody();

		this.ladders.setOrigin(0.5, 0.5).setDepth(3);

		this.physics.add.overlap(
			this.character,
			this.ladders,
			(character: any, ladder: any) => {
				character.lockedTo = ladder;
				character.setCharacterState(ECharacterState.CLIMB);
			},
			(character: any, ladder: any) => {
				return (
					character.body.left >= ladder.body.left &&
					character.body.right <= ladder.body.right &&
					((this.cursors.up.isDown && character.body.bottom - character.body.deltaY() > ladder.body.top) ||
						this.cursors.down.isDown)
				);
			},
			this
		);
	}
	passThru(character: any, ladder: any) {
		return character.characterState !== ECharacterState.CLIMB;
	}

	createBackground() {
		this.add.rectangle(1920 / 2, 1080 / 2, 1920, 1080, 16777215).setOrigin(0.5);
	}

	update(time: any, delta: any) {
		if (this.character.body!.bottom < 220) {
			console.log("game Won");
			this.character.anims.play(EAnimationName.WIN);
		}
		this.character.update(time, delta);

		this.bamboosWithBomb.forEach((b) => {
			b.update(time, delta);
		});
	}
}
