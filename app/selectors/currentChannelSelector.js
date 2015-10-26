import {createSelector} from 'reselect';
import {Map} from 'immutable';

export const currentChannelSelector = createSelector(
  [state => state.channels, state => state.local, state => state.users],
  (channels, local, users) => {
    const currentChannel = channels.find(c => c.get('id') === local.get('currentChannelId'));
    if (currentChannel) {
      if (currentChannel.get('isDirect')) {
        const currentUserId = currentChannel.get('users').find(u => u.get('_id') !== local.get('userId')).get('_id');
        const currentUser = users.find(u => u.get('id') === currentUserId);

        return new Map({
          name: currentUser.get('name'),
          isDirect: true,
          avatar: currentUser.get('avatar'),
          isOnline: currentUser.get('isOnline'),
          email: currentUser.get('email'),
        });
      }
      return new Map({
        name: currentChannel.get('name'),
        isFavorite: currentChannel.get('isFavorite'),
        isDirect: currentChannel.get('isDirect'),
      });
    }
    return new Map({});
  }
);
