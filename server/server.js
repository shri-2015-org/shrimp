import express from 'express';
import startSocketServer from './socket.js';
import webpack from 'webpack';
import makeConfig from '../make-webpack-config.js';

const app = express();
const port = process.env.PORT || 3000;
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


startSocketServer();


app.get('*', (req, res) => {
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


app.listen(port);

