const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

const config = {
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
      },
      {
        test: /\.wasm$/,
        loaders: ['wasm-loader']
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
      'ir': path.resolve(__dirname, 'src', 'ir'),
      'interpreter': path.resolve(__dirname, 'src', 'interpreter'),
      'compiler': path.resolve(__dirname, 'src', 'compiler'),
      "text-generation": path.resolve(__dirname, 'src', 'text-generation'),
      "components": path.resolve(__dirname, 'src', 'components'),
      "consts": path.resolve(__dirname, 'src', 'consts'),
      "types": path.resolve(__dirname, 'src', 'types'),
      "utils": path.resolve(__dirname, 'src', 'utils'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};

const workerConfigTemplate = {
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
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'ir': path.resolve(__dirname, 'src', 'ir'),
      'interpreter': path.resolve(__dirname, 'src', 'interpreter'),
      'compiler': path.resolve(__dirname, 'src', 'compiler'),
      "text-generation": path.resolve(__dirname, 'src', 'text-generation'),
      "components": path.resolve(__dirname, 'src', 'components'),
      "consts": path.resolve(__dirname, 'src', 'consts'),
      "types": path.resolve(__dirname, 'src', 'types'),
      "utils": path.resolve(__dirname, 'src', 'utils'),
    }
  }
};

function getWorkerConfig(workerName, path) {
  const config = {
    ...workerConfigTemplate,
    entry: {
      [workerName]: path
    }
  };

  return config;
}

function setDevMode(config, mode) {
  if (mode === 'production') {
    config.mode = 'production';
    config.devtool = 'none';
    config.plugins.push(
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
  }
}

module.exports = (env, argv) => {
  const additinalWorker = getWorkerConfig('logic-loop', path.resolve(__dirname, 'src', 'threading', 'logic-loop.ts'));
  const workerConfig = getWorkerConfig('worker', path.resolve(__dirname, 'src', 'worker.ts'));

  setDevMode(config, argv.mode);
  setDevMode(additinalWorker, argv.mode);
  setDevMode(workerConfig, argv.mode);

  return [config, workerConfig, additinalWorker];
};
