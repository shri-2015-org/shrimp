import {createSelector} from 'reselect';
import {List} from 'immutable';

export const joinedUsersSelector = createSelector(
  [state => state.local, state => state.channels, state => state.users],
  (local, channels, users) => {
    const channel = channels.find(c => c.get('id') === local.get('currentChannelId'));

    return channel && channel.get('users')
      ? channel.get('users').map(u => users.find(us => us.get('id') === u.get('_id')))
      : new List([]);
  }
);
