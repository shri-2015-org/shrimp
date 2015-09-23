import {createSelector} from 'reselect';

const messagesSelector = state => {
  return state.messages.map(message => {
    const senderObj = state.users.find(user => user.get('id') === message.get('senderId'));
    return message.set('sender', senderObj);
  });
};
const localSelector = (state) => state.local;
const channelsSelector = (state) => state.channels;
const usersSelector = (state) => state.users;

export const currentChannelMessagesSelector = createSelector(
  [messagesSelector, localSelector, channelsSelector, usersSelector],
  (messages, local, channels, users) => ({
    local: local,
    messages: messages.filter(m => m.get('channelId') === local.get('currentChannelId')),
    channels: channels,
    users: users,
  }),
);
