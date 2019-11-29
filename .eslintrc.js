module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/destructuring-assignment": 0,
    "linebreak-style": 0,
    "no-unused-expressions": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "import/no-unresolved":0,
    "no-undef": 0,
    "no-console": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": 0,
    "no-alert": 0,
    "no-use-before-define": 0,
    "no-unescaped-entities": 0
},
};
