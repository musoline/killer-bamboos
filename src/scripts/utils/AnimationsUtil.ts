import {TAnimationDetail} from "@/types/TAnimationDetail";
import GameScene from "@/ui/scenes/GameScene";

export class AnimationUtil {
	public static createAnimation(scene: GameScene, animationDetails: TAnimationDetail) {
		if (scene.anims.get(animationDetails.name) !== undefined) return;

		scene.anims.create({
			key: `${animationDetails.name}`,
			frames: scene.anims.generateFrameNames(`c-${animationDetails.name}`, {
				prefix: `${animationDetails.name}-`,
				start: 0,
				end: animationDetails.endFrame,
				suffix: ".png"
			}),
			frameRate: 7,
			repeat: -1
		});
	}
}
