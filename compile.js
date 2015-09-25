const webpack = require('webpack');
const makeConfig = require('./make-webpack-config.js');

const config = makeConfig({
  sourcemaps: false,
  devtool: 'eval',
  optimize: true,
});
const compiler = webpack(config);

compiler.run(function Compile(err, stats) {
  console.log('Complited in ' + ((stats.endTime - stats.startTime) / 1000));
});
