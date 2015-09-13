import express from 'express';
import path from 'path';
import startSocketServer from './socket.js';

const app = express();
const port = 3000;

startSocketServer();

// const renderApplication = require('../build/bundle.js');
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.send(
    '<!doctype html>' +
    '<html>' +
    '<body>' +
      '<script src="bundle.js"></script>' +
    '</body>' +
    '</html>'
  );
});


app.listen(port);
