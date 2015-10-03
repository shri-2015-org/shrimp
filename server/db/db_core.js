import getUserModel from '../models/user';
const User = getUserModel();

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
  User.findOne({ _id: userId }, (err, user) => {
    user.sessionId = sessionId;
    user.save(err => {
      if (err) console.log(err);
      callback(sessionId);
    });
  });
}
