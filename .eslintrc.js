module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	settings: {
		"import/resolver": {
			node: {
				extensions: [".js", ".ts", ".d.ts"],
			},
		},
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "import", "prettier"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"import/extensions": ["error", "never", { svg: "always" }],
		"import/no-named-as-default-member": 2,
		"import/order": ["error", { "newlines-between": "always" }],
		"import/no-duplicates": 2,
		"import/no-useless-path-segments": 2,
		"import/no-cycle": 2,
		"import/prefer-default-export": 0,
		"import/no-anonymous-default-export": 0,
		"import/named": 0,
		"import/namespace": 0,
		"import/default": 0,
		"import/no-named-as-default": 0,
		"import/no-unused-modules": 0,
		"import/no-deprecated": 0,
		"prettier/prettier": "error",
	},
};
