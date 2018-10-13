module.exports = {
    env: {
      browser: true,
      jest: true,
      es6: true,
      node: true,
    },
    extends: ['airbnb', 'prettier', 'prettier/react'],
    plugins: ['react'],
    rules: {
      'react/no-unused-prop-types': 0,
      'import/prefer-default-export': 0,
      'react/destructuring-assignment': 0,
      'import/no-unresolved': 0,
      'import/extensions': 0,
    },
    parser: 'babel-eslint',
  };
  