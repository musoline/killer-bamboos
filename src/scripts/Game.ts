import config from "./config/config";
import {Api} from "./services/Api";
import {TResponse} from "./types/TResponse";
import BootScene from "./ui/scenes/BootScene";
import GameScene from "./ui/scenes/GameScene";
import PreloaderScene from "./ui/scenes/PreloaderScene";

export default class Game extends Phaser.Game {
	apiConnected: boolean = false;
	initData: TResponse;
	constructor() {
		super(config);

		this.scene.add("BootScene", BootScene);
		this.scene.add("PreloaderScene", PreloaderScene);
		this.scene.add("GameScene", GameScene);
		this.scene.start("BootScene");
	}
}
