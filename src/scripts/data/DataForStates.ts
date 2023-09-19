import {EAnimationName} from "@/enums/EAnimationName";
import {ECharacterDirection} from "@/enums/ECharacterDirection";
import {ECharacterState} from "@/enums/ECharacterState";

export const DATA_FOR_STATE = {
	[ECharacterDirection.LEFT]: {
		Velocity_x: -150,
		Velocity_y: 0,
		Gravity_x: -50,
		Gravity_y: 0,
		State: ECharacterState.RUN,
		Animation_name: EAnimationName.RUN
	},
	[ECharacterDirection.RIGHT]: {
		Velocity_x: 150,
		Velocity_y: 0,
		Gravity_x: 50,
		Gravity_y: 0,
		State: ECharacterState.RUN,
		Animation_name: EAnimationName.RUN
	},
	[ECharacterDirection.JUMP]: {
		Velocity_x: 0,
		Velocity_y: -400,
		Gravity_x: 0,
		Gravity_y: 0,
		State: ECharacterState.JUMP,
		Animation_name: EAnimationName.CLIMB
	},
	[ECharacterDirection.CLIMB]: {
		Velocity_x: 0,
		Velocity_y: 0,
		Gravity_x: 0,
		Gravity_y: 0,
		State: ECharacterState.CLIMB,
		Animation_name: EAnimationName.CLIMB
	}
};
