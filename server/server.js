import express from 'express';
import path from 'path';
import http from 'http';
import mongoose from 'mongoose';
import startSocketServer from './socket.js';
const debug = require('debug')('shrimp:server');

//Test
import getMessageModel from './models/message.js';
import getConfig from './config.js';

//debug( getMessageModel() );


const app = express();
const server = new http.Server(app);
const port = process.env.PORT || 3000;
const config = getConfig();
const isDev = process.env.NODE_ENV == 'development';
const env = process.env.NODE_ENV;
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

startSocketServer(server);
mongoose.connect(config.db[env]);

app.get('/', (req, res) => {
  res.send(
    '<!doctype html>' +
    '<html>' +
    '<body>' +
      '<div id="root"></div>' +
      '<script src="/static/bundle.js"></script>' +
    '</body>' +
    '</html>'
  );
});


server.listen(port);
