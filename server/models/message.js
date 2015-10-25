import mongoose from 'mongoose';
import {isEmpty, getToObjectOptions} from './utils';

const ObjectId = mongoose.Types.ObjectId;

const message = new mongoose.Schema({
  senderId: mongoose.Schema.Types.ObjectId,
  channelId: mongoose.Schema.Types.ObjectId,
  text: String,
  timestamp: { type: Date, default: Date.now },
  pinned: Boolean,
  linksInfo: {type: Array},
});

message.statics.getAll = function getAll() {
  return new Promise((resolve, reject) => {
    this.find({}, null, {sort: {timestamp: 1}}, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
};

message.statics.isEmpty = isEmpty;
message.set('toObject', getToObjectOptions());

message.statics.pin = function pin(messageId) {
  return this.update({ _id: new ObjectId(messageId) }, { $set: { pinned: true } });
};

message.statics.unpin = function unpin(messageId) {
  return this.update({ _id: new ObjectId(messageId) }, { $set: { pinned: false } });
};

message.statics.getForChannels = function getForChannels(channelIds) { return this.find({ channelId: { $in: channelIds } }); };

message.statics.add = function add(data, cb) {
  return new this(data).save(cb);
};

message.statics.addLinksInfo = function addLinksInfo(messageId, info) {
  return this.update({ _id: new ObjectId(messageId) }, { $set: { linksInfo: info } });
};

export default function getMessageModel() {
  return mongoose.model('Message', message);
}
