import mongoose from 'mongoose';
import faker from 'faker';
import {isEmpty, getAll, getToObjectOptions} from './utils';

const channel = new mongoose.Schema({
  name: String,
  isFavourite: Boolean,
  userIds: Array,
});

channel.statics.getAll = getAll;
channel.statics.isEmpty = isEmpty;

channel.statics.getForUser = function getForUser(userId) { return this.find({ userIds: userId }); };

channel.set('toObject', getToObjectOptions());

channel.statics.createTestChannel = function createTestChannel() {
  return new this({
    name: faker.hacker.noun(),
    isFavourite: faker.random.boolean(),
  });
};

export default function getChannelModel() {
  return mongoose.model('Channel', channel);
}
