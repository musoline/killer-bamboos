module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true,
		amd: true
	},
	extends: ["eslint:recommended", "prettier"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 13,
		sourceType: "module"
	},
	plugins: ["@typescript-eslint"],
	rules: {
		"no-invalid-this": "off",
		"no-unused-vars": "off",
		"no-undef": "off",
		"no-extra-boolean-cast": "off",
		"no-redeclare": "off",
		"@typescript-eslint/no-invalid-this": "off",
		"require-jsdoc": "off",
		newIsCap: 0,
		"no-empty": ["error", {allowEmptyCatch: true}],
		"space-before-function-paren": ["off"],
		quotes: ["error", "double", {allowTemplateLiterals: true}]
	},
	globals: {
		Phaser: "readonly",
		DEVELOPMENT: "readonly",
		PRODUCTION: "readonly",
		CHEAT_TOOL: "readonly",
		UK: "readonly",
		FUN: "readonly",
		LOGS: "readonly",
		VERSION: "readonly",
		COMMITHASH: "readonly",
		DYNAMIC_TOKEN: "readonly"
	}
};
