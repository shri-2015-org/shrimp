import mongoose from 'mongoose';
import faker from 'faker';
import {isEmpty, getAll, getToObjectOptions} from './utils';

const ObjectId = mongoose.Types.ObjectId;

const channel = new mongoose.Schema({
  name: String,
  isFavourite: Boolean,
  userIds: Array,
});

channel.statics.getAll = getAll;
channel.statics.isEmpty = isEmpty;

channel.statics.getForUser = function getForUser(userId) {
  return this.find({ userIds: new ObjectId(userId) });
};

channel.set('toObject', getToObjectOptions());

channel.statics.createTestChannel = function createTestChannel() {
  return new this({
    name: faker.hacker.noun(),
    isFavourite: faker.random.boolean(),
    userIds: [],
  });
};

channel.statics.add = function add(data, cb) {
  return new this(data).save(cb);
};

export default function getChannelModel() {
  return mongoose.model('Channel', channel);
}
