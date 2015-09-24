import mongoose from 'mongoose';
import faker from 'faker';
const schema = new mongoose.Schema({
  name: String,
  isFavourite: Boolean,
  // unreadMessagesCount: Number,
  // userIds: [Schema.Types.ObjectId],
});

schema.statics.createTestChannel = function createTestChannel() {
  return new this({
    name: faker.hacker.noun(),
    isFavourite: faker.random.boolean(),
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
    self.find({}, (err, channels) => {
      if (err) {
        reject(err);
      }else {
        resolve(channels);
      }
    });
  });
};

export default function getChannelModel() {
  return mongoose.model('Channel', schema);
}
