import {List, Map} from 'immutable';

/* Not sure we need this function here. */
export function intiateState() {
  return Map({
    channels: List(),
    messages: List(),
    users: List(),
    user: Map(),
  });
}

export function addChannel(state, channel) {
  return state.updateIn(['channels'], List(), channels => channels.push(channel));
}

export function removeChannel(state, channelId) {
  const index = state.get('channels').map(item => item.get('id')).indexOf(channelId);

  return state.updateIn(['channels'], List(), channels => channels.delete(index));
}

export function addUserToChannel(state, channelId, userId) {
  const index = state.get('channels').map(item => item.get('id')).indexOf(channelId);

  return state.updateIn(['channels', index, 'userIds'], List(), userIds => userIds.push(userId) );
}

export function removeUserFromChannel(state, channelId, userId) {
  const index = state.get('channels').map(item => item.get('id')).indexOf(channelId);

  return state.updateIn(['channels', index, 'userIds'], List(), userIds => userIds.delete(userIds.indexOf(userId)));
}

export function addMessage(state, message) {
  const channelId = message.get('channelId');
  const index = state.get('channels').map(item => item.get('id')).indexOf(channelId);
  return state
    .updateIn(['channels', index, 'messageIds'], List(), messageIds => messageIds.push(message.get('id')))
    .updateIn(['messages'], List(), messages => messages.push(message));
}
