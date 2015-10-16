import mongoose from 'mongoose';
import getChannelModel from './models/channel';
const Channel = getChannelModel();

export function dropCollections() {
  const collections = mongoose.connection.collections;
  for (const i in collections) {
    if (collections.hasOwnProperty(i)) {
      collections[i].drop(() => {});
    }
  }
}

export function createDefaultChannel() {
  Channel.isEmpty().then((notEmpty) => {
    if (!notEmpty) {
      Channel.createTestChannel('Default').save();
    }
  });
}
