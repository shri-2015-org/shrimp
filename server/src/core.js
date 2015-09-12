import {List, Map} from 'immutable';

export function setChannels (state, channels) {
  return state.set('channels', channels);
}

export function addUserToChannel (state, channelId, userId) {
  let index = state.get('channels').map((item) => { return item.get('id'); }).indexOf(channelId);

  return state.updateIn(['channels', index, 'userIds'], 0, userIds => userIds.push(userId) );
}