import async from 'async';
import mongoose from 'mongoose';
import getChannelModel from './models/channel';
const Channel = getChannelModel();

function createTestChannels(name) {
  return new Promise((resolve, reject) => {
    Channel.isEmpty().then((isEmpty) => {
      if (!isEmpty) {
        const fns = [];
        const func = (cb) => {
          Channel.createTestChannel(name).save(cb);
        };
        for (let i = 0; i < 1; i++) {
          fns.push(func);
        }
        async.parallel(fns, (err, results) => {
          const ids = [];
          results.forEach((item) => {
            ids.push(item[0]._id);
          });

          if (err) reject(err);
          else resolve(ids);
        });
      } else {
        resolve([]);
      }
    });
  });
}


export function dropCollections() {
  const collections = mongoose.connection.collections;
  for (const i in collections) {
    if (collections.hasOwnProperty(i)) {
      collections[i].drop(() => {});
    }
  }
}

export function createTestCollections() {
  createTestChannels('Default');
}
