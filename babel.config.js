module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        root: ['./src'],
        alias: {
          helpers: './src/components/helpers',
          svg: './src/components/svg',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
