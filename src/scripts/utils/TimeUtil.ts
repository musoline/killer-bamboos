export class TimeUtil {
	public static getRandomSecond(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
	}
}
