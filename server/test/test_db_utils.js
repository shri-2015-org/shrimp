import getConfig from '../config.js';
import mongoose from 'mongoose';
import {beforeEach, afterEach} from 'mocha';
const config = getConfig();
process.env.NODE_ENV = 'test';
const env = process.env.NODE_ENV;

mongoose.connect(config.db[env]);

beforeEach( (done) => {
  function clearDB() {
    const collections = mongoose.connection.collections;
    for (const i in collections) {
      if (collections.hasOwnProperty(i)) {
        collections[i].remove(() => {});
      }
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.db.test, (err) => {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  } else {
    return clearDB();
  }
});

afterEach((done) => {
  mongoose.disconnect();
  return done();
});
