import faker from 'faker';
import getUserModel from '../models/user';
import {generateSessionId} from './lib/core.js';

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


export function signUpUser(login, password, callback) {
  const sessionId = generateSessionId();
  const newUser = new User({
    nick: login,
    name: faker.name.firstName(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
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


export function checkUserSession(sessionId) {
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
        userId: user.id,
        status: {
          type: 'error',
          text: 'These user already exist',
        },
      };
      callback(userData);
    } else {
      const userData = {
        userid: '',
        status: {
          type: 'success',
          text: 'Welcome',
        },
      };
      callback(userData);
    }
  });
}
