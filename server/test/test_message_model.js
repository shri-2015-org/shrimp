import {expect} from 'chai';
import getMessageModel from '../models/message.js';
import mongoose from 'mongoose';
require('./test_db_utils.js');
const Message = getMessageModel();
const mongoObjectId = mongoose.Types.ObjectId;
describe('Message models', () => {
  it('should create a new Message', (done) => {
    const messageId = mongoObjectId();
    const senderId = mongoObjectId();
    const channelId = mongoObjectId();
    const message = {
      _id: messageId,
      senderId: senderId,
      channelId: channelId,
      text: 'My message',
    };

    Message.create(message, (e, createdMessage) => {
      expect(createdMessage._id).to.equal(messageId);
      expect(createdMessage.senderId).to.equal(senderId);
      expect(createdMessage.channelId).to.equal(channelId);
      expect(createdMessage.text).to.equal('My message');
      done();
    });
  });
});
