import {createSelector} from 'reselect';

const messagesSelector = state =>
  state.messages.map(message => {
    const senderObj = state.users.find(user => user.get('id') === message.get('senderId'));
    return message.set('sender', senderObj);
  });

export const currentChannelMessagesSelector = createSelector(
  [state => state, messagesSelector],
  (state, messages) => messages.filter(m => m.get('channelId') === state.local.get('currentChannelId'))
);
