import {createSelector} from 'reselect';

const messagesSelector = state => {
  return state.messages.map(message => {
    const senderObj = state.users.find(user => user.get('id') === message.get('senderId'));
    return message.set('sender', senderObj);
  });
};

const currentChannelIdSelector = (state) => state.currentChannelId;

export const currentChannelMessagesSelector = createSelector(
  [messagesSelector, currentChannelIdSelector],
  (messages, currentChannelId) => ({
    currentChannelId,
    messages: messages.filter(m => m.get('channelId') === currentChannelId),
  }),
);
