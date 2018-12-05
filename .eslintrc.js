// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
    },
    env: {
        browser: true,
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: ['plugin:vue/essential', 'airbnb-base'],
    // required to lint *.vue files
    plugins: ['vue'],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.base.conf.js',
            },
        },
    },
    // add your custom rules here
    rules: {
        // don't require .vue extension when importing
        'import/extensions': [
            'error',
            'always',
            {
                js: 'never',
                vue: 'never',
            },
        ],
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        // 'no-param-reassign': [
        //     'error',
        //     {
        //         props: true,
        //         ignorePropertyModificationsFor: [
        //             'state', // for vuex state
        //             'acc', // for reduce accumulators
        //             'e', // for e.returnvalue
        //         ],
        //     },
        // ],
        // allow optionalDependencies
        'import/no-extraneous-dependencies': [
            'error',
            {
                optionalDependencies: ['test/unit/index.js'],
            },
        ],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        indent: ['error', 4, { SwitchCase: 1 }],
        'arrow-parens': ['error', 'as-needed'],
        'linebreak-style': ['off'],
        'no-return-assign': ['off'],
        'no-plusplus': ['off'],
        'max-len': ['off'],
        'no-param-reassign': ['off'],
        'class-methods-use-this': ['off'],
        'space-before-function-paren': ['off'],
        'no-mixed-operators': ['off'],
        'prefer-arrow-callback': ['off'],
        'prefer-template': ['off'],
        'no-nested-ternary': ['off'],
        'guard-for-in': ['off'],
        'no-restricted-syntax': ['off'],
        yoda: ['off'],
        'no-use-before-define': ['off'],
        'no-prototype-builtins': ['off'],
        'no-underscore-dangle': ['off'],
        'no-bitwise': ['off'],
        'func-names': ['off'],
        "object-shorthand": ["off"],
    },
    overrides: {
        files: ['*.vue'],
        rules: {
            'vue/html-indent': [
                'error',
                4,
                {
                    attribute: 1,
                    closeBracket: 0,
                    alignAttributesVertically: false,
                    ignores: [],
                },
            ],
        },
    },
    globals: {
        serverApiConfig: true,
    },
};
