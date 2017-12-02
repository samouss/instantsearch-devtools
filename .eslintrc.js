module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['jest', 'react', 'jsx-a11y', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  globals: {
    chrome: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  rules: {
    'no-shadow': 0,
    'prettier/prettier': 1,
    'react/jsx-filename-extension': 0,
    'import/prefer-default-export': 0,
  },
};
