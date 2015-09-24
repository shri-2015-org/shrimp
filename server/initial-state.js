import getChannelModel from './models/channel';
const Channel = getChannelModel();
import getUserModel from './models/user';
const User = getUserModel();
import getMessageModel from './models/message';
const Message = getMessageModel();

export default function getInitState() {
  return new Promise((resolve, reject) => {
    const state = {};

    Promise.all([ Channel.getAll(), Message.getAll(), User.getAll() ]).then((results) => {
      let channels = results[0];
      const messages = results[1];
      let users = results[2];

      channels = channels.map((channel) => {
        // data returned from Mongoose is immutable
        const channelObj = channel.toObject();
        channelObj.unreadMessagesCount = 20;
        return channelObj;
      });

      users = users.map((user) => {
        const userlObj = user.toObject();
        userlObj.isOnline = true;
        return userlObj;
      });

      state.users = users;
      state.channels = channels;
      state.messages = messages;
      state.local = {
        'userId': users[0]._id,
        'currentchannelId': channels[0]._id,
        'pendingMessages': [],
      };

      resolve(state);
    }).catch((exeption) => {
      reject(exeption);
    });
  });
}
