var webpack = require('webpack');
var webpackConfig = require('./make-webpack-config.js')({
  sourcemaps: true,
  devtool: 'eval',
});


module.exports = function(config) {
  var browsers = [process.env.DEBUG ? 'Chrome' : 'PhantomJS'];

  config.set({
    autoWatch: true,
    browsers: browsers,
    singleRun: false,
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },
    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests.webpack.js',
    ],
    reporters: ['dots'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
  });
};
