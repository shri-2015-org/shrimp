import {createSelector} from 'reselect';

export const indirectChannelsSelector = createSelector(
  [state => state, state => state.channels],
  (state, channels) => channels.filter(c => !c.get('isDirect'))
);

export const currentChannelsSelector = createSelector(
  [state => state, state => state.channels],
  (state, channels) => channels.find(c => c.get('id') === state.local.get('currentChannelId'))
);
