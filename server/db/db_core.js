import gravatar from 'gravatar';
import getUserModel from '../models/user';
import getChannelModel from '../models/channel';

const Channel = getChannelModel();
const User = getUserModel();
const debug = require('debug')('shrimp:server');

export function signInUser(login, password, callback) {
  User.findOne({ nick: login }, (err, user) => {
    if (user) {
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


export function signUpUser(login, password, email, sessionId, callback) {
  const newUser = new User({
    nick: login,
    email: email,
    avatar: gravatar.url(email),
    password: password,
    sessionId: sessionId,
  });
  newUser.save(error => {
    if (error) debug(error);
    callback(sessionId);
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


export function checkUserLogin(login, callback) {
  User.findOne({ nick: login }, (err, user) => {
    if (user) {
      const userData = {
        status: {
          type: 'error',
          text: 'User with this login already exists',
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

export function checkLoginExist(login, callback) {
  User.findOne({nick: login}, (err, user) => {
    if (user) {
      callback(true);
    } else {
      callback(false);
    }
  });
}

export function joinToChannel(sessionId, channelId, callback) {
  return new Promise((resolve, reject) => {
    Channel.findOne({_id: channelId})
    .then((channel) => {
      User.getBySessionId(sessionId)
        .then((user) => {
          channel.userIds.push(user._id);
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
