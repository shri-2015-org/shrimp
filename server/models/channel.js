import mongoose from 'mongoose';
import faker from 'faker';
import {isEmpty, getAll, getToObjectOptions} from './utils';

const ObjectId = mongoose.Types.ObjectId;

const channel = new mongoose.Schema({
  name: String,
  users: [{
    lastSeen: {
      type: Date,
    },
    isFavourite: {
      type: Boolean,
    },
  }],
});

channel.statics.getAll = getAll;
channel.statics.isEmpty = isEmpty;

channel.statics.getForUser = function getForUser(userId) {
  return this.find( { 'users._id': new ObjectId(userId) } );
};

channel.set('toObject', getToObjectOptions());

channel.statics.createTestChannel = function createTestChannel() {
  return new this({
    name: faker.hacker.noun(),
    users: [],
  });
};

channel.statics.add = function add(data, cb) {
  return new this(data).save(cb);
};

channel.statics.markAsRead = function add(data, userId) {
  this.findOne( { '_id': data.channelId }, (err, foundChannel) => {
    const userPrefsIndex = foundChannel.users.findIndex(u => u._id.toString() === userId);
    if (foundChannel.users[userPrefsIndex]) {
      foundChannel.users[userPrefsIndex].lastSeen = data.lastSeen;
    }
    foundChannel.save();
  });
};

export default function getChannelModel() {
  return mongoose.model('Channel', channel);
}
