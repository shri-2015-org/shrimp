import {A, CS} from '../../constants.js';

export function addChannel(channel) {
  return {
    type: A.ADD_CHANNEL,
    channel: channel,
  };
}

export function newChannel(channel) {
  return {
    type: CS.ADD_CHANNEL,
    payload: channel,
    send: true,
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

export function markChannelAsRead(data) {
  return {
    type: CS.MARK_AS_READ,
    payload: data,
    send: true,
  };
}


export function replaceDirtyChannel(channel) {
  return {
    type: A.REPLACE_DIRTY_CHANNEL,
    payload: channel,
  };
}

export function addDirtyChannel() {
  return {
    type: A.ADD_DIRTY_CHANNEL,
  };
}

export function removeDirtyChannel() {
  return {
    type: A.REMOVE_DIRTY_CHANNEL,
  };
}
