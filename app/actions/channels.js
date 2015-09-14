export function addChannel(channel) {
  return { type: 'ADD_CHANNEL', channel: channel };
}
export function removeChannel(channelId) {
  return { type: 'REMOVE_CHANNEL', channelId: channelId };
}
