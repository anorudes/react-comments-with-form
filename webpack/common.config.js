const R = require('ramda');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const TARGET = process.env.npm_lifecycle_event;
const PROJECTS = require('./projects.json');
const ALIAS_CONFIG = require('./alias.config.js');

let workingMode;
process.env.BABEL_ENV = TARGET;

const getDevelopmentURL = () => {
  // Production and Pure Development MODE
  return '/dist/';
};

const commonConfig = {
  output: {
    path: __dirname + `/../dist/`,
    publicPath: getDevelopmentURL(),
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    alias: ALIAS_CONFIG.resolve.alias,
  },

  module: {
    rules: [{
      test: /\.woff$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/font-woff',
      },
    }, {
      test: /\.woff2$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/font-woff2',
      },
    }, {
      test: /\.ttf$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/octet-stream',
      },
    }, {
      test: /\.otf$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/font-otf',
      },
    }, {
      test: /\.eot$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'mimetype=application/font-eot',
      },
    }, {
      test: /\.svg$/,
      loader: 'svg-url-loader',
      options: {
        limit: 10000,
        mimetype: 'mimetype=image/svg+xml',
      },
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.png$/,
      loader: 'file-loader',
      options: {
        name: '[name][hash].[ext]',
        hash: 'sha512',
        digest: 'hex',
      },
    }, {
      test: /\.jpg$/,
      loader: 'file-loader',
      options: {
        name: '[name][hash].[ext]',
        hash: 'sha512',
        digest: 'hex',
      },
    }, {
      test: /\.gif$/,
      loader: 'file-loader',
      options: {
        name: '[name][hash].[ext]',
        hash: 'sha512',
        digest: 'hex',
      },
    }],
  },

  plugins: [],
};

let additionalConfigPath;

if (process.env.NODE_ENV === 'development' && !global.ssr) {
  additionalConfigPath = './dev.config.js';
  workingMode = 'dev';
}

if (process.env.NODE_ENV === 'development' && global.ssr) {
  additionalConfigPath = './dev.ssr.config.js';
  workingMode = 'dev-ssr';
}

if (process.env.NODE_ENV === 'test') {
  additionalConfigPath = './prod.config.js';
  workingMode = 'test';
}

if (process.env.NODE_ENV === 'production') {
  additionalConfigPath = './prod.config.js';
  workingMode = 'prod';
}

let resultConfig = [];
PROJECTS.map(project => {
  const additionalProjectConfig = require(additionalConfigPath)(project);
  commonConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${process.env.NODE_ENV}'`,
      },
      __PROJECT__: project,
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __TEST__: process.env.NODE_ENV === 'test',
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __CLIENT__: true,
    })
  );
  if (process.env.NODE_ENV === 'development') {
    resultConfig = merge.smart(
      additionalProjectConfig, !R.isEmpty(resultConfig) ? resultConfig : commonConfig
    );
  } else {
    resultConfig.push(merge(additionalProjectConfig, commonConfig));
  }
});

if (workingMode === 'dev') {
  resultConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = resultConfig;
