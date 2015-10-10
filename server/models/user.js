import mongoose from 'mongoose';
import faker from 'faker';
import {isEmpty, getAll, getToObjectOptions} from './utils';

const user = new mongoose.Schema({
  nick: String,
  name: String,
  email: String,
  avatar: String,
  password: String,
  sessionId: String,
});

user.statics.getAll = getAll;
user.statics.isEmpty = isEmpty;
user.statics.getBySessionId = function getBySessionId(sessionId) { return this.findOne({ sessionId }); };
user.set('toObject', getToObjectOptions());

user.statics.createTestUser = function createTestUser() {
  return new this({
    nick: faker.internet.userName(),
    name: faker.name.firstName(),
    email: faker.internet.getEmail(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
  });
};

export default function getUserModel() {
  return mongoose.model('User', user);
}
