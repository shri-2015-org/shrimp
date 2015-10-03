import getChannelModel from './models/channel';
import getMessageModel from './models/message';
import getUserModel from './models/user';
const User = getUserModel();
const Channel = getChannelModel();
const Message = getMessageModel();


export default function getInitState(sessionId) {
  return new Promise((resolve, reject) => {
    const state = {};

    Promise.all([ Channel.getAll(), Message.getAll(), User.getAll() ]).then((results) => {
      let channels = results[0];
      let messages = results[1];
      let users = results[2];
      const currentUser = users.find(user => user.sessionId === sessionId );
      const userId = currentUser.id;


      channels = channels.map((channel) => {
        const channelObj = channel.toObject();
        channelObj.unreadMessagesCount = 20;
        return channelObj;
      });

      messages = messages.map((message) => message.toObject());

      users = users.map((user) => {
        const userObj =  user.toObject();
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
