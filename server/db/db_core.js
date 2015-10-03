import getUserModel from '../models/user';
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
