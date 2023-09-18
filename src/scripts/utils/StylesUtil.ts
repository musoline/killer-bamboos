export class StylesUtil {
	private static formatFontSize(fontSize: number | undefined): string {
		return `${fontSize?.toString()}px`;
	}

	public static create(
		fontFamily: string,
		fontSize: number | undefined,
		fixedWidth: number | undefined,
		align: string,
		color: string,
		fontStyle?: string
	) {
		return {
			fontFamily,
			fontSize: StylesUtil.formatFontSize(fontSize),
			fixedWidth,
			align,
			color,
			fontStyle
		};
	}
}
