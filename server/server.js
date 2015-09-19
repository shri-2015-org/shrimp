import express from 'express';
import path from 'path';
import http from 'http';
import mongoose from 'mongoose';
import startSocketServer from './socket.js';
import getConfig from './config.js';

// const debug = require('debug')('shrimp:server');

const app = express();
const server = new http.Server(app);
const port = process.env.PORT || 3000;
const appConfig = getConfig();
const isDev = process.env.NODE_ENV === 'development';
const env = process.env.NODE_ENV;
const isDebug = process.env.DEBUG;
const isMongoConnect = process.env.MONGO_CONNECT;

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


startSocketServer(server);

if (isMongoConnect === 'yes') {
  mongoose.connect(appConfig.db[env]);
}

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


server.listen(port);
