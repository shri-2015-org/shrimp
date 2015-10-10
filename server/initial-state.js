import getChannelModel from './models/channel';
import getMessageModel from './models/message';
import getUserModel from './models/user';
const User = getUserModel();
const Channel = getChannelModel();
const Message = getMessageModel();

export default function getInitState(sessionId) {
  return new Promise((resolve, reject) => {
    const state = {};

    Promise.all([ Channel.getAll(), Message.getAll(), User.getAll(), User.findOne({ sessionId }).select({ sessionId: 1 }) ]).then((results) => {
      let channels = results[0];
      let messages = results[1];
      let users = results[2];
      const currentUser = results[3];

      const userId = currentUser.id;

      channels = channels.map((channel) => {
        const channelObj = channel.toObject();
        const userPrefsForChannel = channelObj.users.find(user => user._id.toString() === userId);
        if (userPrefsForChannel) {
          channelObj.joined = true;
          channelObj.lastSeen = userPrefsForChannel.lastSeen !== undefined ? userPrefsForChannel.lastSeen : null;
        }
        delete channelObj.users;
        return channelObj;
      });

      messages = messages.map((message) => message.toObject());

      users = users.map((user) => {
        const userObj = user.toObject();
        userObj.isOnline = true;
        return userObj;
      });
      state.users = users;
      state.channels = channels;
      state.messages = messages;
      state.local = {
        userId,
        sessionId,
        currentChannelId: channels[0].id,
        pendingMessages: [],
      };
      resolve(state);
    }).catch((exeption) => {
      reject(exeption);
    });
  });
}
