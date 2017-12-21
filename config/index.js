/*
 * `index` module
 * ==============
 *
 * Webpack settings.
 */

'use strict';

const paths = require('./paths');
const plugins = require('./plugins');

module.exports = env => {
  const isProduction = env && env.production;

  return {
    context: paths.context,

    entry: {
      vendor: ['phaser'],
      app: './scripts/'
    },

    output: {
      filename: '[name]-[chunkhash].bundle.js',
      path: paths.dist
    },

    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: require('./babel')
        }
      }]
    },

    plugins: plugins(isProduction),

    devtool: 'cheap-source-map',

    devServer: {
      contentBase: paths.public,
      compress: true,
      port: 3000
    }
  };
};
