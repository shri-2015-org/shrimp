import {createSelector} from 'reselect';

const messagesSelector = state =>
  state.messages.map(message => {
    const senderObj = state.users.find(user => user.get('id') === message.get('senderId'));
    return message.set('sender', senderObj);
  });


const currentChannelMessagesSelector = createSelector(
  [state => state, messagesSelector],
  (state, messages) => messages.filter(m => m.get('channelId') === state.local.get('currentChannelId'))
);

const filterValue = state => state.messagesFilterValue;

export const messageFilterSelector = createSelector(
  currentChannelMessagesSelector,
  filterValue,
  (messages, value) => messages.filter(message => message.get('text').toLowerCase().indexOf(value) !== -1)
);

export const pinnedMessagesSelector = createSelector(
  currentChannelMessagesSelector,
  (messages) => messages.filter(message => message.get('pinned'))
);
