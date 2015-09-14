import {List} from 'immutable';

export function addUserToChannel(state, channelId, userId) {
  const index = state.get('channels').map(item => item.get('id')).indexOf(channelId);

  return state.updateIn(['channels', index, 'userIds'], List(), userIds => userIds.push(userId) );
}

export function removeUserFromChannel(state, channelId, userId) {
  const index = state.get('channels').map(item => item.get('id')).indexOf(channelId);

  return state.updateIn(['channels', index, 'userIds'], List(), userIds => userIds.delete(userIds.indexOf(userId)));
}
