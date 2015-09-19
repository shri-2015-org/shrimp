import {expect} from 'chai';
import getMessageModel from '../models/message.js';
import mongoose from 'mongoose';
const db_utils = require('./test_db_utils.js');
const Message = getMessageModel();

describe('Message models', function () {
  it('should create a new Message', function (done) {
    const messageId = mongoose.Types.ObjectId();
    const senderId = mongoose.Types.ObjectId();
    const channelId = mongoose.Types.ObjectId();
    const message = {
      _id: messageId,
      senderId: senderId,
      channelId: channelId,
      text: 'My message'     
    };

    Message.create(message, function(e, createdMessage){
      expect(createdMessage._id).to.equal(messageId);
      expect(createdMessage.senderId).to.equal(senderId);
      expect(createdMessage.channelId).to.equal(channelId);
      expect(createdMessage.text).to.equal('My message');
      done();
    });
  });
});
