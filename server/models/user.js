import mongoose from 'mongoose';
import faker from 'faker';
import {isEmpty, getAll, getToObjectOptions} from './utils';

const ObjectId = mongoose.Types.ObjectId;

const user = new mongoose.Schema({
  email: String,
  name: String,
  avatar: String,
  passwordHash: {
    type: String,
    select: false,
  },
  sessionId: {
    type: String,
    select: false,
  },
  favoritesChannels: {type: Array, default: []},
});

user.statics.getAll = getAll;
user.statics.isEmpty = isEmpty;
user.statics.getBySessionId = function getBySessionId(sessionId) { return this.findOne({ sessionId }); };
user.statics.getById = function getById(id) { return this.findOne({ _id: new ObjectId(id) }).select({ sessionId: 1 }); };
user.set('toObject', getToObjectOptions());

user.statics.createTestUser = function createTestUser() {
  return new this({
    email: faker.internet.getEmail(),
    name: faker.name.firstName(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
  });
};

export default function getUserModel() {
  return mongoose.model('User', user);
}
