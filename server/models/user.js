import mongoose from 'mongoose';
import faker from 'faker';
import {isEmpty, getAll, getToObjectOptions} from './utils';

const user = new mongoose.Schema({
  nick: String,
  name: String,
  avatar: String,
  password: String,
});

user.statics.getAll = getAll;
user.statics.isEmpty = isEmpty;
user.set('toObject', getToObjectOptions());

user.statics.createTestUser = function createTestUser() {
  return new this({
    nick: faker.internet.userName(),
    name: faker.name.firstName(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
  });
};

export default function getUserModel() {
  return mongoose.model('User', user);
}
