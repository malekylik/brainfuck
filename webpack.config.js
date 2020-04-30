const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const config = {
  entry: {
    main: path.resolve(__dirname, 'src', 'index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    hot: false,
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
    new ForkTsCheckerWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-typescript']
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
  resolve: {
    alias: {
      memory: path.resolve(__dirname, 'src/memory'),
      utils: path.resolve(__dirname, 'src/utils'),
      render: path.resolve(__dirname, 'src/render'),
    },
    extensions: ['.js', '.ts']
  }
};

const workerConfig = {
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
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-typescript']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.mode = 'production';
    config.devtool = 'none';
    workerConfig.mode = 'production';
    workerConfig.devtool = 'none';
  } else {
    config.mode = 'development';
    config.devtool = 'eval-source-map';
    workerConfig.mode = 'development';
    workerConfig.devtool = 'eval-source-map';
  }

  return [config, workerConfig];
};
