import {createSelector} from 'reselect';
import {setUnreadMessagesCount} from 'selectors/selectorHelpers';

export const indirectChannelsSelector = createSelector(
  [state => state, state => state.channels, state => state.messages],
  (state, channels, messages) =>
    setUnreadMessagesCount(channels.filter(c => !c.get('isDirect')), messages)
);
