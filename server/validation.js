import getMessageModel from './models/message';
import getUserModel from './models/user';

const Message = getMessageModel();
const User = getUserModel();

export function checkEditPermission(sessionId, messageId) {
  return new Promise((resolve, reject) => {
    Promise.all([User.getBySessionId(sessionId), Message.getById(messageId)]).then(([user, message]) => {
      if (user.id.toString() === message.senderId.toString()) {
        resolve();
      } else {
        reject(new Error('Permission denied'));
      }
    });
  });
}
