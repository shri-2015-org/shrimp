import mongoose from 'mongoose';
import {isEmpty, getToObjectOptions} from './utils';

const ObjectId = mongoose.Types.ObjectId;

const message = new mongoose.Schema({
  senderId: mongoose.Schema.Types.ObjectId,
  channelId: mongoose.Schema.Types.ObjectId,
  text: String,
  timestamp: { type: Date, default: Date.now },
  edited: { type: Boolean, default: false },
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

message.statics.getForChannels = function getForChannels(channelIds) { return this.find({ channelId: { $in: channelIds } }); };

message.statics.add = function add(data, cb) {
  return new this(data).save(cb);
};

message.statics.edit = function edit(data, cb) {
  this.findOne( {_id: new ObjectId(data.messageId)}, (err, m) => {
    m.text = data.text;
    m.timestamp = Date.now();
    m.edited = true;
    m.save(cb);
  });
};

message.statics.getById = function getById(id) {
  return new Promise((resolve, reject) => {
    this.findOne({_id: new ObjectId(id)}, (err, m) => {
      if (err) {
        reject(err);
      } else {
        resolve(m);
      }
    });
  });
};

export default function getMessageModel() {
  return mongoose.model('Message', message);
}
