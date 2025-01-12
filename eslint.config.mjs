import globals from "globals";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.{js,mjs,cjs,jsx}"] },
	{ languageOptions: { globals: globals.browser } },
	{
		...pluginReact.configs.flat.recommended,
		rules: {
			...pluginReact.configs.flat.recommended.rules,
			"react/prop-types": "off",
			"react/react-in-jsx-scope": "off",
		},
	},
];

