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


export function setFavoriteChannel(channelId, isFavorite) {
  return {
    type: CS.SET_FAVORITE_CHANNEL,
    payload: {channelId, isFavorite},
    send: true,
  };
}


export function removeChannel(channelId) {
  return {
    type: A.REMOVE_CHANNEL,
    channelId: channelId,
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


export function joinToChannel(channelId) {
  return {
    type: CS.JOIN_TO_CHANNEL,
    payload: channelId,
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

export function addDirtyDirectChannel(channelName) {
  return {
    type: A.ADD_DIRTY_DIRECT_CHANNEL,
    payload: channelName,
  };
}

export function removeDirtyDirectChannel(dirtyName) {
  return {
    type: A.REMOVE_DIRTY_DIRECT_CHANNEL,
    payload: dirtyName,
  };
}

export function addDirectChannel(data) {
  return {
    type: CS.ADD_DIRECT_CHANNEL,
    payload: data,
    send: true,
  };
}
