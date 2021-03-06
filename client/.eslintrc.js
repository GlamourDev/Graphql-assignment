module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"airbnb",
		"airbnb-typescript",
		"prettier",
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
		tsconfigRootDir: __dirname,
		project: "tsconfig.json",
	},
	plugins: ["react", "@typescript-eslint", "simple-import-sort"],
	settings: {
		react: {
			version: "detect",
		},
		"import/resolver": {
			"node": {
			  "extensions": [".js", ".jsx", ".ts", ".tsx"]
			},
		},
	},
	rules: {
		"max-len": 0,
		"react/react-in-jsx-scope": "off",
		"react/jsx-first-prop-new-line": [1, "multiline"],
		"react/jsx-max-props-per-line": [
			1,
			{
				maximum: 1,
				when: "multiline",
			},
		],
		"react/jsx-closing-bracket-location": [2, "tag-aligned"],
		"react/prop-types": "off",
		"react/display-name": "off",
		"no-mixed-spaces-and-tabs": "off",
		"react/no-unescaped-entities": "off",
		"@typescript-eslint/ban-types": [
			"error",
			{
				extendDefaults: true,
				types: {
					"{}": false,
				},
			},
		],
		"react/jsx-filename-extension": [1, { "extensions": [".tsx", ".ts"] }],
		"react/function-component-definition": [
			2,
			{
			  "namedComponents": "arrow-function"
			}
		  ],
			"no-shadow": "off",
			"@typescript-eslint/no-shadow": "off",
			"jsx-a11y/no-autofocus": "off",
			'no-restricted-syntax': [
				'error',
				'LabeledStatement',
				'WithStatement'
			]
	},
	overrides: [
		{
			files: ["**/*.js?(x)", "**/*.ts?(x)"],
			rules: {
				"react-hooks/exhaustive-deps": "off",
				"@typescript-eslint/no-unused-vars": "off",
				"@typescript-eslint/explicit-module-boundary-types": "off",
				"no-unused-vars": "off",
			},
		},
	],
};
