const webpack = require('webpack');
const makeConfig = require('./make-webpack-config.js');

const config = makeConfig({
  sourcemaps: false,
  devtool: 'eval',
  minimize: true,
});
const compiler = webpack(config);

compiler.run(function (err, stats) {
  console.log('Complited in ' + ((stats.endTime - stats.startTime) / 1000));
});
