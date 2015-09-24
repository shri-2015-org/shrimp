import mongoose from 'mongoose';
import faker from 'faker';

const schema = new mongoose.Schema({
  nick: String,
  name: String,
  avatar: String,
  // isOnline: Boolean,
});

schema.statics.createTestUser = function createTestUser() {
  return new this({
    nick: faker.internet.userName(),
    name: faker.name.firstName(),
    avatar: faker.image.avatar(),
  });
};

schema.statics.isEmpty = function isEmpty() {
  const self = this;
  return new Promise((resolve, reject) => {
    self.count((err, count) => {
      if (err) reject(err);
      else resolve((count > 0) ? true : false);
    });
  });
};

schema.statics.getAll = function getAll() {
  const self = this;
  return new Promise((resolve, reject) => {
    self.find({}, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
};

export default function getUserModel() {
  return mongoose.model('User', schema);
}
