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


export function filterChannels(data) {
  return {
    type: A.FILTER_CHANNELS,
    payload: data,
  };
}


export function addUserToChannel(data) {
  return {
    type: A.JOIN_TO_CHANNEL,
    payload: data,
  };
}
