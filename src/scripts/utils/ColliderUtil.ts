import GameScene from "@/ui/scenes/GameScene";

export class ColliderUtil {
	static addColliderMethod(scene: GameScene) {
		scene.physics.add.collider(scene.bird, scene.obstacles, () => {
			ColliderUtil.endGame(scene);
		});
	}

	static endGame(scene: GameScene) {
		scene.showResult();
		scene.bird.body.gravity.x = 0;
		scene.bird.body.velocity.x = 0;
		scene.obstacles.forEach((obstacle) => {
			obstacle.body.gravity.x = 0;
			obstacle.body.velocity.x = 0;
		});
		scene.obstacles.forEach((obstacle) => {
			obstacle.destroy();
		});
		scene.bird.x = 200;
		scene.play = false;
	}
}
