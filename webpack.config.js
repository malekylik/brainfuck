const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const { commonConfig } = require('./common-webpack.config');

const config = {
  ...commonConfig,
  entry: {
    main: path.resolve(__dirname, 'src', 'index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    hot: false,
    hotOnly: true,
    contentBase: './dist',
    historyApiFallback: {
      rewrites: [
        { from: '/', to: '/index.html' },
      ]
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      hash: false,
      minify: false,
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /(\.ts?$|\.tsx?$)/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          plugins: [
            '@babel/plugin-transform-react-jsx',
            '@babel/plugin-transform-runtime'
          ],
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
        cacheGroups: {
          vendor: {
                test: /node_modules/,
                name: 'vendor',
                chunks: 'initial',
                enforce: true
            }
        }
    },
  },
};

const workerConfig = {
  ...commonConfig,
  entry: {
    worker: path.resolve(__dirname, 'src', 'worker.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    globalObject: `(() => {
      if (typeof self !== 'undefined') {
          return self;
      } else if (typeof window !== 'undefined') {
          return window;
      } else if (typeof global !== 'undefined') {
          return global;
      } else {
          return Function('return this')();
      }
  })()`,
  },
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
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.mode = 'production';
    config.devtool = 'none';
    config.plugins.push(
      new DefinePlugin({
        __DEV__: false
      })
    );
    workerConfig.mode = 'production';
    workerConfig.devtool = 'none';
    workerConfig.plugins.push(
      new DefinePlugin({
        __DEV__: false
      })
    );
  } else {
    config.mode = 'development';
    config.devtool = 'eval-source-map';
    config.plugins.push(
      new DefinePlugin({
        __DEV__: true
      })
    );
    workerConfig.mode = 'development';
    workerConfig.devtool = 'eval-source-map';
    workerConfig.plugins.push(
      new DefinePlugin({
        __DEV__: true
      })
    );
  }

  return [config, workerConfig];
};
