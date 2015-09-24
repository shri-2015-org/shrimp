import async from 'async';
import mongoose from 'mongoose';
import getChannelModel from './models/channel';
const Channel = getChannelModel();
import getUserModel from './models/user';
const User = getUserModel();
import getMessageModel from './models/message';
const Message = getMessageModel();

function createTestChannels(num) {
  return new Promise((resolve, reject) => {
    Channel.isEmpty().then((isEmpty) => {
      if (!isEmpty) {
        const fns = [];
        const func = (cb) => {
            Channel.createTestChannel().save(cb);
          };

        for (let i = 0; i < num; i++) {
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
      }else {
        resolve([]);
      }
    });
  });
}

function createTestUsers(num) {
  return new Promise((resolve, reject) => {
    User.isEmpty().then((isEmpty) => {
      if (!isEmpty) {
        const fns = [];
        const func = (cb) => {
            User.createTestUser().save(cb);
          };

        for (let i = 0; i < num; i++) {
          fns.push(func);
        }

        async.parallel(fns, (err, results) => {
          if (err) {
            reject(err);
          }else {
            const ids = [];
            results.forEach((item) => {
              ids.push(item[0]._id);
            });
            resolve(ids);
          }
        });
      }else {
        resolve([]);
      }
    });
  });
}

function createTestMessages(num, idsChannels, idsSenders) {
  return new Promise((resolve, reject) => {
    Message.isEmpty().then((isEmpty) => {
      if (!isEmpty) {
        const fns = [];
        const func = (cb) => {
            Message.createTestMessage(idsSenders, idsChannels).save(cb);
          };

        for (let i = 0; i < num; i++) {
          fns.push(func);
        }

        async.parallel(fns, (err, results) => {
          if (err) {
            reject(err);
          }else {
            const ids = [];
            results.forEach((item) => {
              ids.push(item[0]._id);
            });
            resolve(ids);
          }
        });
      }else {
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
  Promise.all([createTestChannels(5), createTestUsers(5)]).then((results) => {
    createTestMessages(50, results[0], results[1]);
  });
}
