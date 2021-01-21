const path = require('path');

const commonConfig = {
  plugins: [],
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
  },
};


module.exports = {
  commonConfig,
};
