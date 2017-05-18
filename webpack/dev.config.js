const webpack = require('webpack');
// const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = function (project) {
  return {
    output: {
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    },

    entry: {
      [`prj_${project}`]: [
        'babel-polyfill',
        'webpack-hot-middleware/client',
        './src/index.js',
      ],
    },

    module: {
      rules: [{
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
        }, {
          loader: 'sass-loader',
        }],
      }, {
        test: /\.mscss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            importLoaders: '2',
            module: true,
            localIdentName: '[path]__[local]__[hash:base64:3]',
          },
        }, {
          loader: 'postcss-loader',
        }, {
          loader: 'sass-loader',
        }],
      }],
    },
  };
};
