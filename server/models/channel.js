import mongoose from 'mongoose';
import {isEmpty, getToObjectOptions} from './utils';

const ObjectId = mongoose.Types.ObjectId;

const channel = new mongoose.Schema({
  name: String,
  users: [{
    lastSeen: {
      type: Date,
    },
    isFavorite: {
      type: Boolean,
    },
    _id: {
      type: mongoose.Schema.ObjectId,
    },
  }],
  isDirect: Boolean,
});

channel.statics.getAll = function getAll() {
  return new Promise((resolve, reject) => {
    this.find({}, null, {sort: {name: 1}}, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
};

channel.statics.isEmpty = isEmpty;
channel.statics.getChannelsByUserId = function getChannelsByUserId(userId) {
  return this.find({ $or: [{isDirect: null}, { isDirect: true, 'users._id': new ObjectId(userId) }] });
};

channel.statics.getForUser = function getForUser(userId) {
  return this.find( { 'users._id': new ObjectId(userId) } );
};

channel.set('toObject', getToObjectOptions());

channel.statics.createTestChannel = function createTestChannel(name) {
  return new this({
    name: name,
    users: [],
  });
};

channel.statics.addDirectChannel = function addDirectChannel(data, cb) {
  return new this({
    isDirect: true,
    users: data.userIds.map(i => ({
      _id: new ObjectId(i),
      lastSeen: new Date().toUTCString(),
    })),
    name: data.name,
  }).save(cb);
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


channel.statics.markAsFavorite = function add(data, userId) {
  this.findOne( { '_id': data.channelId }, (err, foundChannel) => {
    const userPrefsIndex = foundChannel.users.findIndex(u => u._id.toString() === userId);
    if (foundChannel.users[userPrefsIndex]) {
      foundChannel.users[userPrefsIndex].isFavorite = data.isFavorite;
    }
    foundChannel.save();
  });
};


channel.statics.subscribeOnDefaultChannel = function add(userId) {
  this.findOne( { name: 'Default' }, (err, c) => {
    c.users.push({
      _id: new ObjectId(userId),
      lastSeen: new Date(),
    });
    c.save();
  });
};

export default function getChannelModel() {
  return mongoose.model('Channel', channel);
}
