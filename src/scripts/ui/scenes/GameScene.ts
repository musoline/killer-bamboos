import Game from "@/Game";
import {Api} from "@/services/Api";
import {TResponse} from "@/types/TResponse";
import {ColliderUtil} from "@/utils/ColliderUtil";
import {CheatTool} from "../cheatTool/CheatTool";
import {Ground} from "@/utils/Ground";

export default class GameScene extends Phaser.Scene {
	game: Game;
	grounds: Ground[] = [];
	resultText: Phaser.GameObjects.Text;

	constructor() {
		super("GameScene");
	}

	async init() {
		this.createBackground();
		this.createResultText();
		this.createPlatform();
		this.createLadder();
	}

	createPlatform() {
		(new Ground(this,0,1080)).setOrigin(0,1).setScale(2)

		// this.add.image(0, 1080, "ground").setOrigin(0, 1).setScale(2);
		this.add.image(430, 860, "ground").setOrigin(0, 1).setScale(2);
		this.add.image(900, 680, "ground").setOrigin(0, 1).setScale(2);
		this.add.image(675, 480, "ground").setOrigin(0, 1).setScale(2);
		this.add.image(1125, 280, "ground").setOrigin(0, 1).setScale(2);
	}
	createLadder() {
		this.add.image(420, 1000, "ladder").setOrigin(0, 1).setScale(1);
		this.add.image(850, 800, "ladder").setOrigin(0, 1).setScale(1);
		this.add.image(1250, 600, "ladder").setOrigin(0, 1).setScale(1);
	}

	createResultText() {
		this.resultText = this.add
			.text(1920 / 2, 1080 / 2, "You Won!", {
				color: "red",
				fontSize: "200px"
			})
			.setDepth(20)
			.setOrigin(0.5)
			.setAlpha(1)
			.setVisible(true);
	}

	async playGame() {
		ColliderUtil.addColliderMethod(this);
	}

	showResult() {}

	createBackground() {
		this.add.rectangle(1920 / 2, 1080 / 2, 1920, 1080, 0xffffff).setOrigin(0.5);
	}

	update() {}
}
