import {A} from '../../constants.js';

export function addChannel(channel) {
  return {
    type: A.ADD_CHANNEL,
    channel: channel,
  };
}


export function removeChannel(channelId) {
  return {
    type: A.REMOVE_CHANNEL,
    channelId: channelId,
  };
}
