import express from 'express';
import path from 'path';
import startSocketServer from './socket.js';
// const debug = require('debug')('shrimp:server');

const app = express();
const port = process.env.PORT || 3000;

const isDev = process.env.NODE_ENV = 'development';
const isDebug = process.env.DEBUG;

if (isDev && isDebug && process.env.DEBUG.indexOf('shrimp:front') === 0) {
  const webpack = require('webpack');
  const makeConfig = require('../make-webpack-config.js');

  const config = makeConfig({
    sourcemaps: false,
    devtool: 'eval',
  });
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use('/static', express.static(path.join(__dirname, '../static')));
}

startSocketServer();


app.get('/', (req, res) => {
  res.send(
    '<!doctype html>' +
    '<html>' +
    '<head>' +
    '<link href="https://fonts.googleapis.com/css?family=Roboto:400,300&subset=latin,cyrillic-ext,latin-ext,cyrillic" rel="stylesheet" type="text/css">' +
    '</head>' +
    '<body>' +
    '<div id="root"></div>' +
    '<script src="/static/bundle.js"></script>' +
    '</body>' +
    '</html>'
  )
  ;
});


app.listen(port);

