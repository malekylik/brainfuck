const path = require('path');
const { commonConfig } = require('./common-webpack.config');

const utilConfig = {
  ...commonConfig,
  entry: {
    perfUtil: path.resolve(__dirname, 'src', 'utils', 'perf-bin-to-json.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  target: 'node',
  plugins: [],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-typescript'],
          plugins: ['@babel/plugin-transform-runtime'],
        }
      }
    ]
  }
};

module.exports = utilConfig;
