// @ts-check

import path from "node:path"
import { fileURLToPath } from "node:url"
import { fixupPluginRules, includeIgnoreFile } from "@eslint/compat"
import eslint from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"
import prettier from "eslint-config-prettier"
import importPluginX from "eslint-plugin-import-x"
import jsxA11y from "eslint-plugin-jsx-a11y"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import tailwind from "eslint-plugin-tailwindcss"
import globals from "globals"
import tseslint from "typescript-eslint"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, ".gitignore")

const nextFlatConfig = {
  plugins: {
    // @ts-expect-error - next plugin is not properly typed for eslint9
    "@next/next": fixupPluginRules(nextPlugin)
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs["core-web-vitals"].rules
  }
}

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  jsxA11y.flatConfigs.recommended,
  importPluginX.flatConfigs.recommended,
  importPluginX.flatConfigs.typescript,
  ...tailwind.configs["flat/recommended"],
  // @ts-expect-error - next.js plugin is not properly typed for eslint9
  nextFlatConfig,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  /**
   * Global config
   */
  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "import-x/newline-after-import": "error",
      "import-x/no-unresolved": "off",
      "import-x/order": [
        "error",
        {
          alphabetize: {
            order: "asc"
          }
        }
      ],
      // @see {@link https://eslint.org/docs/latest/rules/sort-imports}
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true
        }
      ]
    },
    settings: {
      tailwindcss: {
        callees: ["className", "clsx", "cva", "cn"]
      }
    }
  },
  /**
   * React
   */
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...reactHooks.configs.recommended,
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"],
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser
      }
    }
  },
  /**
   * Config files
   */
  {
    files: ["**/*.config.{js,mjs,cjs}"],
    rules: {
      "import-x/no-named-as-default-member": "off"
    }
  },
  /**
   * Test files
   */
  {
    files: ["**/*.test.{js,ts}"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off"
    }
  },
  /**
   * Javascript files.
   *
   * Ignore type-checking
   */
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked
  },

  // Prettier at the end, also ignore any errors
  prettier
)
