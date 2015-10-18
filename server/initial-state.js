import getChannelModel from './models/channel';
import getMessageModel from './models/message';
import getUserModel from './models/user';
const User = getUserModel();
const Channel = getChannelModel();
const Message = getMessageModel();

export default function getInitState(sessionId) {
  return new Promise((resolve, reject) => {
    const state = {};
    User.getBySessionId(sessionId)
      .then(user => Channel.getChannelsByUserId(user._id))
      .then(channels => {
        Promise.all([Message.getForChannels(channels.map(c => c._id)), User.getAll(), User.findOne({sessionId}).select({sessionId: 1}), Channel.getDefaultChannel()]).then(([messages, users, currentUser, defaultChannel]) => {
          const userId = currentUser.id;

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
            userObj.isOnline = true;
            return userObj;
          });

          state.channels = channelObjects;
          state.messages = messages.map((message) => message.toObject());
          state.local = {
            userId,
            sessionId,
            currentChannelId: defaultChannel.id,
            pendingMessages: [],
          };
          resolve(state);
        }).catch((exeption) => {
          reject(exeption);
        });
      });
  });
}
