import { Api } from "@/services/Api";
import { TResponse } from "@/types/TResponse";
import { CheatTool } from "../cheatTool/CheatTool";


import Game from "@/Game";
import { ColliderUtil } from "@/utils/ColliderUtil";
import { Ground } from "@/utils/Ground";
import { Character } from "./Character";
import { ECharacterState } from "@/enums/ECharacterState";


export default class GameScene extends Phaser.Scene {
    game: Game;
    grounds: Ground[] = [];
    resultText: Phaser.GameObjects.Text;
    character: Character;
    platforms: Phaser.GameObjects.Group;
    ladders: Phaser.GameObjects.Group;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor() {
        super("GameScene");
    }

    async init() {
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.createBackground();
        this.createResultText();
        this.createCharacter();
        this.createPlatforms();
        this.createLadder();
        this.createUserInputEvents();
    }
    createUserInputEvents() {
        const right = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        const left = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        const down = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        const up = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.UP);


        right?.on("down", () => this.characterGoRight())
        right?.on("up", () => this.CharacterStop())



        left?.on("down", () => this.characterGoLeft())
        left?.on("up", () => this.CharacterStop())




        up?.on("down", () => {
            this.character.body!.velocity.y = -400
            this.character.anims.play("climb");
        })
        up?.on("up", () => { console.log("Up Arrow Up") })


        down?.on("down", () => { console.log("Down Arrow Down") })
        down?.on("up", () => { console.log("Down Arrow Up") })

    }



    characterGoLeft() {
        this.character.anims.play("run");
        this.character.body!.gravity.x = -50;
        this.character.body!.velocity.x = -150;
    }

    characterGoRight() {
        this.character.anims.play("run");
        this.character.body!.gravity.x = 50;
        this.character.body!.velocity.x = 150;

    }

    CharacterStop() {
        this.character.body!.gravity.x = 0;
        this.character.body!.velocity.x = 0;
        this.character.anims.stop()
    }

    createCharacterAnimations() {
        const animationsDetails = [
            { name: "run", endFrame: 8 },
            { name: "win", endFrame: 7 },
            { name: "climb", endFrame: 7 },
            { name: "die", endFrame: 7 },
        ];

        animationsDetails.forEach(animationDetails => {
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


        this.platforms = this.physics.add.staticGroup()

        this.platforms.create(225, 1040, "ground").setScale(2).setImmovable(true).refreshBody();
        this.platforms.create(430, 840, "ground").setScale(2).setImmovable(true).refreshBody();
        this.platforms.create(675, 480, "ground").setScale(2).setImmovable(true).refreshBody();
        this.platforms.create(840, 635, "ground").setScale(2).setImmovable(true).refreshBody();
        this.platforms.create(1125, 280, "ground").setScale(2).setImmovable(true).refreshBody();

        this.platforms.setOrigin(0.5, 0.5)



        this.physics.add.collider(this.character, this.platforms, undefined, this.passThru, this);
    }

    createPlatform() {

    }
    createLadder() {

        this.ladders = this.physics.add.staticGroup();

        this.ladders.create(420, 880, "ladder").setOrigin(0.5, 0.5).setImmovable(true).refreshBody();
        this.ladders.create(1050, 600, "ladder").setOrigin(0, 1).setImmovable(true).refreshBody();
        this.ladders.create(590, 820, "ladder").setOrigin(0, 1).setImmovable(true).refreshBody();



        this.physics.add.overlap(this.character, this.ladders, (character: any, ledder: any) => { character.lockedTo = ledder; character.setCharacterState(ECharacterState.CLIMB) }, (character: any, ladder: any) => {
            return (character.body.left >= ladder.body.left && character.body.right <= ladder.body.right) &&
                ((this.cursors.up.isDown && (character.body.bottom - character.body.deltaY()) > ladder.body.top) || this.cursors.down.isDown)
        }, this)
    }
    passThru(character: any, ladder: any) {
        return character.characterState !== ECharacterState.CLIMB
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

    showResult() { }

    createBackground() {
        this.add.rectangle(1920 / 2, 1080 / 2, 1920, 1080, 16777215).setOrigin(0.5);
    }

    update(time: any, delta: any) {
        this.character.update(time, delta)


        console.log(this.character.body)
    }
}
