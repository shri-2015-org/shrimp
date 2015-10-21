import getChannelModel from './models/channel';
import getMessageModel from './models/message';
import getUserModel from './models/user';
const User = getUserModel();
const Channel = getChannelModel();
const Message = getMessageModel();

export default function getInitState(sessionId, onlineSessions = new Set()) {
  return new Promise((resolve, reject) => {
    const state = {};
    User.getBySessionId(sessionId)
      .then(user => Channel.getChannelsByUserId(user._id))
      .then(channels => {
        Promise.all([Message.getForChannels(channels.map(c => c._id)), User.getAll(true), User.findOne({sessionId}).select('+sessionId')]).then(([messages, users, currentUser]) => {
          const userId = currentUser.id;
          const currentChannelId = currentUser.currentChannelId;

          const channelObjects = channels.map((channel) => {
            const channelObj = channel.toObject();
            const userPrefsForChannel = channelObj.users.find(user => user._id.toString() === userId);
            if (userPrefsForChannel) {
              channelObj.joined = true;
              channelObj.lastSeen = userPrefsForChannel.lastSeen !== undefined ? userPrefsForChannel.lastSeen : null;
              channelObj.isFavorite = !!userPrefsForChannel.isFavorite;
            }
            if (!channelObj.isDirect) {
              delete channelObj.users;
            }
            return channelObj;
          });

          state.users = users.map((user) => {
            const userObj = user.toObject();
            delete userObj.sessionId;
            userObj.isOnline = onlineSessions.has(user.sessionId);
            return userObj;
          });

          state.channels = channelObjects;
          state.messages = messages.map((message) => message.toObject());
          state.local = {
            userId,
            sessionId,
            currentChannelId,
            pendingMessages: [],
          };
          resolve(state);
        }).catch((exeption) => {
          reject(exeption);
        });
      });
  });
}
