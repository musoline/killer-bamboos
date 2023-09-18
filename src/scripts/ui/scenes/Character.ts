import GameScene from "./GameScene";
import { TECharacterState } from "@/types/TECharacterState";
import { ECharacterState } from "@/enums/ECharacterState";

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
        this.setCollideWorldBounds(true)
        this.lockedTo = null;
        this.isGrounded = true;
    }

    setCharacterState(state: TECharacterState): void {
        this.characterState = state
    }

    update(time: any, delta: any) {
        //@ts-ignore
        this.isGrounded = this.body!.onFloor()
        switch (this.characterState) {
            case ECharacterState.CLIMB: if (this.scene.cursors.right.isDown) {
                console.log("Test")
                this.setCharacterState(ECharacterState.IDLE);
            }
            else if (this.scene.cursors.left.isDown) {
                console.log("Test")
                this.setCharacterState(ECharacterState.IDLE);
            }
                if (this.scene.cursors.up.isDown && this.body!.bottom > this.lockedTo.body.top) {
                    this.anims.play('climb');
                    this.body!.velocity.y = -160;
                } else if (this.scene.cursors.down.isDown && !this.isGrounded)
                    if (this.body!.top < this.lockedTo.body.bottom) {
                        this.anims.play('climb', true);
                        this.body!.velocity.y = 160
                    }
                    else {
                        this.setState(ECharacterState.IDLE);
                    }
                else {
                    this.anims.play('run', true)
                    this.body!.velocity.y = 0
                }
                break;
        }
    }
}