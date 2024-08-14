// @ts-check

import path from "node:path"
import { fileURLToPath } from "node:url"
import { includeIgnoreFile } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import tseslint from "typescript-eslint"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, ".gitignore")

// Compatibility with ESLint 8 config (for next.js)
const compat = new FlatCompat({
  baseDirectory: __dirname
})

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  ...compat.extends("next/core-web-vitals"),
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigDirName: import.meta.dirname
      }
    }
  },
  {
    files: ["**/*.config.{js,mjs}"],
    ...tseslint.configs.disableTypeChecked
  }
)
