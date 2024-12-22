import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import "@rushstack/eslint-patch/modern-module-resolution.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("Directory name:", __dirname);
console.log("File name:", __filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals")];

export default eslintConfig;
