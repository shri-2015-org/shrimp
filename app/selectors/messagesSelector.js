import {createSelector} from 'reselect';

const messagesSelector = (state) => state.messages;
const currentChannelIdSelector = (state) => state.currentChannelId;

export const currentChannelMessagesSelector = createSelector(
  [messagesSelector, currentChannelIdSelector],
  (messages, currentChannelId) => ({
    currentChannelId,
    messages: messages.filter(m => m.get('channelId') === currentChannelId),
  }),
);
