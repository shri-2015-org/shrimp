import {createSelector} from 'reselect';

export const indirectChannelsSelector = createSelector(
  [state => state, state => state.channels, state => state.messages],
  (state, channels, messages) => channels
    .filter(c => !c.get('isDirect'))
    .map(c => {
      const lastSeen = c ? c.get('lastSeen') : null;
      const unreadCount = !lastSeen
        ? 0
        : messages.filter(m => m.get('channelId') === c.get('id') && Date.parse(m.get('timestamp')) >= Date.parse(lastSeen)).size;
      return c.set('unreadCount', unreadCount);
    })
);
