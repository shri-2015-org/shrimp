import mongoose from 'mongoose';
import faker from 'faker';

const schema = new mongoose.Schema({
  senderId: mongoose.Schema.Types.ObjectId,
  channelId: mongoose.Schema.Types.ObjectId,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

schema.statics.createTestMessage = function createTestMessage(idsSenders, idsChannels) {
  return new this({
    senderId: faker.random.arrayElement(idsSenders),
    channelId: faker.random.arrayElement(idsChannels),
    text: faker.lorem.sentences(),
    timestamp: faker.date.between( new Date(Date.now() - 100 * 1000), new Date(Date.now())),
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

schema.statics.add = function add(data, cb) {
  return  new this(data).save(cb);
};

schema.statics.getAll = function getAll() {
  const self = this;
  return new Promise((resolve, reject) => {
    self.find({}, (err, messages) => {
      if (err) {
        reject(err);
      }else {
        resolve(messages);
      }
    });
  });
};

schema.statics.getByChannel = function getByChannel() {

};

export default function getMessageModel() {
  return mongoose.model('Message', schema);
}
