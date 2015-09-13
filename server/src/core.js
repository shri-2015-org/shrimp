export function setChannels(state, channels) {
  return state.set('channels', channels);
}

export function addUserToChannel(state, channelId, userId) {
  const index = state.get('channels').map(item => item.get('id')).indexOf(channelId);

  return state.updateIn(['channels', index, 'userIds'], 0, userIds => userIds.push(userId) );
}


