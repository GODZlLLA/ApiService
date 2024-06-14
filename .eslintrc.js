'use strict';

// https://eslint.org/docs/latest/rules/
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:vue/vue3-essential',
    'standard-with-typescript',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'vue'],
  rules: {
    semi: 'never',
  },
};
