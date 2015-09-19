import getConfig from '../config.js';
import mongoose from 'mongoose';
import {beforeEach, afterEach} from 'mocha';
const config = getConfig();
process.env.NODE_ENV = 'test';
const env = process.env.NODE_ENV;
const debug = require('debug')('shrimp:test_db_utills');

mongoose.connect(config.db[env]);

beforeEach(function (done) {
  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.db.test, function (err) {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  } else {
    return clearDB();
  }
});

afterEach(function (done) {
  mongoose.disconnect();
  return done();
});  
