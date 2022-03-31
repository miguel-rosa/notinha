module.exports = {
  root: true,
  env: {
    es2021: true,
    jest: true,
  },
  extends: ['@react-native-community', 'plugin:react-native-a11y/basic'],
  rules: {
    'react-native/no-inline-styles': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'prettier/prettier': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {},
      'babel-plugin-root-import': {
        rootPathPrefix: '~',
        rootPathSuffix: 'src',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 0,
        'indent': ['error', 2],
      },
    },
  ],
};
