var path = require('path');
var webpack = require('webpack');
var loadersByExtension = require('./utils/loadersByExtension.js');
var autoprefixer = 'autoprefixer?browsers=last 2 version';

var loadersByExt = loadersByExtension({
  'json': 'json',
  'png|jpg|gif': 'url?limit=5000',
  'woff|woff2': 'url?limit=1',
});

/** options
 * @option optimize {bool}    // optimize js and disabled redux dev tools if true
 * @option sourcemaps {bool}  // generate sourcemaps if true (!rewrite devtool!)
 * @option devtool {string}   // specify devtool
 */

module.exports = function MakeDefaultConfig(options) {
  var config = {
    entry: [
      'webpack-hot-middleware/client',
      './app/Root',
    ],
    output: {
      path: path.join(__dirname, 'static'),
      filename: 'bundle.js',
      publicPath: '/static/',
    },
    plugins: [
      new webpack.DefinePlugin({
        OPTIMIZED: !!options.optimize,
        DEBUG: !options.optimize,
      }),
    ],

    resolve: {
      root: path.join(__dirname, 'app'),
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['app', 'node_modules'],
    },

    resolveLoader: {
      root: [
        path.join(__dirname, 'node_modules'),
        __dirname,
      ],
    },

    module: {
      loaders: loadersByExt.concat([
        {
          test: /\.jsx?$/,
          loaders: ['babel?optional=runtime'],
          include: path.join(__dirname, 'app'),
        },
        {
          test: /\.css$/,
          loader: 'style!css!' + autoprefixer,
        },
        {
          test: /\.styl$/,
          loader: 'style!css!' + autoprefixer + '!stylus',
        },
        {
          test: /\.scss$/,
          loader: 'style!css!' + autoprefixer + '!sass',
        },
        {
          test: /^((?!inline).)*\.svg$/,
          loader: 'url?limit=10000',
        },
        {
          test: /inline\.svg$/,
          loader: 'svg-inline?removeSVGTagAttrs=false',
        },
      ]),
    },
  };

  if (options.optimize) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin()
    );
    options.devtool = null;
    options.sourcemaps = null;
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );

  if (options.sourcemaps) {
    config.devtool = '#inline-source-map';
  } else if (options.devtool) {
    config.devtool = options.devtool;
  }

  return config;
};
