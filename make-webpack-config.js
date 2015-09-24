import path from 'path';
import webpack from 'webpack';
import loadersByExtension from './utils/loadersByExtension.js';
const autoprefixer = 'autoprefixer?browsers=last 2 version';

const loadersByExt = loadersByExtension({
  'json': 'json',
  'png|jpg|gif': 'url?limit=5000',
  'woff|woff2': 'url?limit=1',
  'svg': 'url?limit=10000',
});


/** options
 * @option optimize {bool}    // optimize js if true
 * @option sourcemaps {bool}  // generate sourcemaps if true (!rewrite devtool!)
 * @option devtool {string}   // specify devtool
 */

module.exports = (options) => {
  const plugins = [];
  if (options.optimize) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }}),
      new webpack.optimize.DedupePlugin(),
    );
  }

  const config = {
    entry: [
      'webpack-hot-middleware/client',
      './app/Root',
    ],
    output: {
      path: path.join(__dirname, 'static'),
      filename: 'bundle.js',
      publicPath: '/static/',
    },
    plugins: plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ]),

    resolve: {
      root: path.join(__dirname, 'app'),
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: [
        'app',
        'node_modules',
      ],
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
      ]),
    },
  };

  if (options.sourcemaps) {
    config.devtool = '#inline-source-map';
  } else if (options.devtool) {
    config.devtool = options.devtool;
  }

  if (options.minimize){
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
  }

  return config;
};
