import mongoose from 'mongoose';
import faker from 'faker';
import {isEmpty, getAll, getToObjectOptions} from './utils';

const user = new mongoose.Schema({
  email: String,
  name: String,
  avatar: String,
  passwordHash: String,
  sessionId: String,
});

user.statics.getAll = getAll;
user.statics.isEmpty = isEmpty;
user.statics.getBySessionId = function getBySessionId(sessionId) { return this.findOne({ sessionId }); };
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
