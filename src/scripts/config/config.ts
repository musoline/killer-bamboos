import "phaser";
import UIPlugin from "phaser3-rex-plugins/dist/rexuiplugin.min.js";
import "phaser/plugins/spine/dist/SpinePlugin";

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.WEBGL,

	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		parent: document.querySelector(".wrapper") as HTMLElement,
		width: 1920,
		height: 1080
	},
	physics: {
		default: "arcade",
		matter: {
			debug: true
		},
		arcade: {
			debug: false }
	},

	transparent: true,
	plugins: {
		scene: [
			{
				key: "rexUI",
				plugin: UIPlugin,
				mapping: "rexUI"
			},
			{
				key: "SpinePlugin",
				plugin: window.SpinePlugin,
				mapping: "spine"
			}
		]
	}
};
export default config;
