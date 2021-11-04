module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:postcss-modules/recommended',
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json',
        tsconfigRootDir: './',
    },
    plugins: ['@typescript-eslint', 'import', 'react-hooks'],
    rules: {
        camelcase: 'off',
        '@typescript-eslint/camelcase': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-use-before-define': [
            'error',
            { functions: false, classes: true, variables: true, typedefs: true },
        ],
        '@typescript-eslint/no-empty-interface': [
            'error',
            {
                allowSingleExtends: true,
            },
        ],
        'react/display-name': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        'import/no-default-export': 'error',
        'import/named': 'error',
        'import/order': ['error', { groups: ['external', 'builtin'], 'newlines-between': 'ignore' }],
        'import/first': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'react/prop-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-types': 'off',
        'react/no-unescaped-entities': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'react/no-deprecated': 'off',
        'react/jsx-key': 'off',
        'react/no-render-return-value': 'off',
        'import/namespace': 'off',
        'react/no-children-prop': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'prefer-const': 'off',
        'react/jsx-no-comment-textnodes': 'off',
        'postcss-modules/no-unused-class': 'off',
        "react-hooks/rules-of-hooks": 'error',
        "react-hooks/exhaustive-deps": 'error'
    },
    overrides: [
        {
            // enable the rule specifically for TypeScript files
            files: ['*.tsx'],
            rules: {
                  // "@typescript-eslint/explicit-function-return-type": ["error", { "allowExpressions": true, "allowTypedFunctionExpressions": true, "allowHigherOrderFunctions": true }],
                  "@typescript-eslint/explicit-module-boundary-types": ["off"],
                  "@typescript-eslint/no-non-null-assertion": ["off"],
            },
        },
        {
            // enable the rule specifically for TypeScript files
            files: ['*.test.tsx'],
            rules: {
                  "@typescript-eslint/explicit-function-return-type": ["off"],
                  "@typescript-eslint/no-unused-vars": ["off"],
                  "import/order": "off",
            },
        },
        {
            // enable the rule specifically for TypeScript files
            files: ['*.ts'],
            rules: {
                  "no-console": "off",
                  "import/order": "off",
            },
        },
        {
            // enable the rule specifically for TypeScript files
            files: ['*.pcss'],
            rules: {
                  "postcss-modules/no-unused-class": "off",
            },
        },
    ],
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        'import/ignore': [
            'react-router',
            'sinon',
            'node_modules',
        ],
        'import/resolver': {
            typescript: {},
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
        "postcss-modules": {
            "baseDir": "src",
            "include": ["**/*.css", "**/*.pcss", "**/**/*.pcss", "**/**/**/*.pcss", "**/**/**/**/*.pcss"],
        },
    },
};
