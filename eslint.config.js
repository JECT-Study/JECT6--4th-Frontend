import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-plugin-prettier/recommended";
import pluginImport from "eslint-plugin-import";

// Merge import plugin's recommended rules and settings manually
const importRecommendedRules = pluginImport.configs.recommended.rules;
const importRecommendedSettings = pluginImport.configs.recommended.settings;

export default tseslint.config(
  {
    ignores: [".next", "out", "node_modules", "coverage"],
  },

  {
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      // Removed direct pluginImport.configs.recommended from extends
    ],
    plugins: {
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
      import: pluginImport, // Register the import plugin
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      // Merged settings from pluginImport.configs.recommended
      ...importRecommendedSettings,
      // Configure import resolver for path aliases (might override or merge existing settings)
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      // Merged rules from pluginImport.configs.recommended
      ...importRecommendedRules,

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "@next/next/no-img-element": "warn",

      // FSD-specific import rules (these will override or extend importRecommendedRules if present)
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/namespace": "error",
      "import/default": "error",
      "import/export": "error",
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type"
          ],
          "pathGroups": [
            { "pattern": "next/**", "group": "builtin", "position": "before" },
            { "pattern": "react", "group": "builtin", "position": "before" },
            { "pattern": "@/app/**", "group": "internal", "position": "after" },
            { "pattern": "@/pages/**", "group": "internal", "position": "after" },
            { "pattern": "@/widgets/**", "group": "internal", "position": "after" },
            { "pattern": "@/features/**", "group": "internal", "position": "after" },
            { "pattern": "@/entities/**", "group": "internal", "position": "after" },
            { "pattern": "@/shared/**", "group": "internal", "position": "after" },
          ],
          "pathGroupsExcludedImportTypes": ["builtin"],
          "newlines-between": "always",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ],
      "import/no-duplicates": "error",
      "import/no-cycle": ["error", { "maxDepth": "∞" }],
      "import/no-relative-parent-imports": "off",
    },
  },

  prettier,
);