import mongoose from 'mongoose';
import gravatar from 'gravatar';
import crypto from 'crypto';
import getUserModel from '../models/user';
import getChannelModel from '../models/channel';
import getMessageModel from '../models/message';

const ObjectId = mongoose.Types.ObjectId;
const Channel = getChannelModel();
const User = getUserModel();
const Message = getMessageModel();
const debug = require('debug')('shrimp:server');
const salt = 'pepper';

function hashPassword(password) {
  const passHash = crypto.createHash('sha256');
  passHash.update(password);

  const allHash = crypto.createHash('sha256');
  allHash.update(passHash.digest('hex') + salt);

  return allHash.digest('hex');
}


export function signInUser(email, password, callback) {
  User.findOne({ email }).select({ passwordHash: 1 }).exec((err, user) => {
    if (user && (user.passwordHash === hashPassword(password))) {
      const userData = {
        userId: user.id,
        status: {
          type: 'success',
          text: 'Welcome',
        },
      };
      callback(userData);
    } else {
      const userData = {
        userid: '',
        status: {
          type: 'error',
          text: 'Something wrong',
        },
      };
      callback(userData);
    }
  });
}


export function signUpUser(email, password, name, sessionId, callback) {
  const hash = hashPassword(password);
  Channel.getDefaultChannel().then((defaultChannel) => {
    const newUser = new User({
      email: email,
      name: name,
      avatar: gravatar.url(email),
      passwordHash: hash,
      sessionId: sessionId,
      currentChannelId: defaultChannel.id,
    });
    newUser.save(error => {
      if (error) debug(error);
      Channel.subscribeOnDefaultChannel(newUser.id);
      callback(sessionId);
    });
  });
}


export function setSessionId(userId, sessionId, callback) {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: userId }, (err, user) => {
      if (err) reject(err);
      user.sessionId = sessionId;
      user.save(error => {
        if (error) reject(error);
        resolve();
      });
    });
  }).then(() => {
    callback(sessionId);
  }).catch(exception => { debug(exception); });
}


export function checkSessionId(sessionId) {
  return new Promise((resolve, reject) => {
    User.find({ sessionId: sessionId }, (err, user) => {
      if (err) reject(err);
      if (user.length === 1) {
        resolve();
      } else {
        reject();
      }
    });
  });
}


export function checkUserEmail(email, callback) {
  User.findOne({ email }, (err, user) => {
    if (user) {
      const userData = {
        status: {
          type: 'error',
          text: 'User with this email already exists',
        },
      };
      callback(userData);
    } else {
      const userData = {
        status: {
          type: 'success',
          text: 'Welcome',
        },
      };
      callback(userData);
    }
  });
}


export function checkEmailExist(email, callback) {
  User.findOne({ email }, (err, user) => {
    if (user) {
      callback(true);
    } else {
      callback(false);
    }
  });
}


export function joinToChannel(sessionId, channelId, callback) {
  return new Promise((resolve, reject) => {
    Channel.findOne({ _id: new ObjectId(channelId) })
    .then((channel) => {
      User.getBySessionId(sessionId)
        .then((user) => {
          if (channel.users.filter(u => u._id.equals(user._id)).length) return false;
          channel.users.push({ _id: user._id, lastSeen: Date.now() });
          channel.save(error => {
            if (error) reject(error);
            resolve({userId: user._id});
          });
        });
    });
  }).then(({userId}) => {
    callback(userId, channelId);
  }).catch(exception => { debug(exception); });
}


export function setFavoriteChannel(sessionId, data) {
  User.getBySessionId(sessionId)
    .then((user) => {
      Channel.markAsFavorite(data, user.id);
    });
}


export function setUserInfo(sessionId, email, name, callback) {
  return User.findOneAndUpdate({ sessionId: sessionId }, {
    email: email,
    name: name,
  }, { new: true }, (error, changedUser) => {
    if (error) debug(error);
    callback(changedUser.toObject());
  });
}

export function setCurrentChannel(sessionId, currentChannelId, cb) {
  return User.findOneAndUpdate({ sessionId: sessionId }, {
    currentChannelId: currentChannelId,
  }, { new: true }, (error) => {
    if (error) debug(error);
    if (cb) {
      cb();
    }
  });
}


export function loadChannelHistory(channelId, callback) {
  return Message.find({ channelId }, (error, messages) => {
    if (error) debug(error);
    callback(messages);
  });
}
