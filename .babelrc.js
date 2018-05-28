const plugins = [];

if (process.env.NODE_ENV === 'test') {
  plugins.push('@babel/plugin-transform-modules-commonjs');
}

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'ie >= 10'],
        },
        modules: false,
        useBuiltIns: 'entry',
      },
    ],
    '@babel/preset-react',
    [
      '@babel/preset-stage-2',
      {
        decoratorsLegacy: true,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins,
};
