module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel', // Add nativewind/babel plugin
    ['@babel/plugin-transform-private-methods', { loose: true }],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          '.jsx', // Optional, to support JSX if needed
        ],
        alias: {
          '@': './src',
          '@store': './src/store',
          '@assets': './src/assets',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@lib': './src/lib',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
    'react-native-reanimated/plugin', // Keep this as the last plugin
  ],
};
