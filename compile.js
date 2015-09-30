import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import filesize from 'filesize';
import makeConfig from './make-webpack-config.js';

const config = makeConfig({
  optimize: true,
});
const compiler = webpack(config);

compiler.run(function Compile(err, stats) {
  console.log('Complited in ' + ((stats.endTime - stats.startTime) / 1000));

  const errors = stats.compilation.errors;
  if (errors && errors.length) {
    for (const error of errors) {
      console.log(error);
    }
  } else {
    const opts = stats.compilation.outputOptions;
    const resultSize = fs.statSync(path.join(opts.path, opts.filename)).size;
    console.log(filesize(resultSize));
  }
});
