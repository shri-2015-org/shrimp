import {createSelector} from 'reselect';

export const directChannelsSelector = createSelector(
  [state => state, state => state.channels],
  (state, channels) => channels.filter(c => c.get('isDirect'))
);
