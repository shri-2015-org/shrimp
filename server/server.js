import express from 'express';
import path from 'path';
import http from 'http';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import startSocketServer from './socket.js';
import getConfig from './config.js';
import {createTestCollections} from './fill-db.js';
import {signInUser, signUpUser, checkUserLogin, setSessionId} from './db/db_core.js';
import getInitState from './initial-state';
import {generateSessionId} from './lib/core.js';
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

app.use(bodyParser.json());

startSocketServer(server);

if (isMongoConnect === 'yes') {
  mongoose.connect(appConfig.db[env]);
  createTestCollections();
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/root.html'));
});

app.post('/signin', (req, res) => {
  signInUser(req.body.login, req.body.password, (userData) => {
    if (userData.status.type === 'success') {
      const sessionId = generateSessionId();
      setSessionId(userData.userId, sessionId, (userSessionId) => {
        getInitState(userSessionId).then(initState => {
          res.json(initState);
        });
      });
    } else {
      res.json({user: userData});
    }
  });
});

app.post('/signup', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  checkUserLogin(login, (userData) => {
    if (userData.status.type === 'success') {
      const userSessionId = generateSessionId();
      signUpUser(login, password, userSessionId, () => {
        getInitState(userSessionId).then(initState => {
          res.json(initState);
        });
      });
    } else {
      res.json({user: userData});
    }
  });
});

server.listen(port);
