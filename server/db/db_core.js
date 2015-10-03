import getUserModel from '../models/user';
const User = getUserModel();

export function signInUser(login, password, callback) {
  User.find({ nick: login }, (err, user) => {
    if (user.length > 0) {
      const userData = {
        userId: user[0].id,
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
