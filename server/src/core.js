export function setChannels(state, channels) {
  return state.set('channels', channels);
}

export function addChannel (state, channel) {
  return state.updateIn(['channels'], 0, channels => channels.push(channel));
}

export function removeChannel (state, channelId) {
  const index = state.get('channels').map(item => item.get('id')).indexOf(channelId);

  return state.updateIn(['channels'], 0, channels => channels.delete(index));
}

export function addUserToChannel (state, channelId, userId) {
  const index = state.get('channels').map(item => item.get('id')).indexOf(channelId);

  return state.updateIn(['channels', index, 'userIds'], 0, userIds => userIds.push(userId) );
}

export function removeUserFromChannel (state, channelId, userId) {
  const index = state.get('channels').map(item => item.get('id')).indexOf(channelId);

  console.log(userId);

  return state.updateIn(['channels', index, 'userIds'], 0, userIds => userIds.delete(userIds.indexOf(userId)));
}


