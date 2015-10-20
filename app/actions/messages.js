import {A, CS} from '../../constants';

export function newMessage(data) {
  return {
    type: CS.ADD_MESSAGE,
    payload: data,
    send: true,
  };
}

export function addMessage(message) {
  return {
    type: A.ADD_MESSAGE,
    message,
  };
}


export function loadChannelHistory(data) {
  return {
    type: A.LOAD_CHANNEL_HISTORY,
    payload: data,
  };
}

export function changeMessageFilterValue(value) {
  return {
    type: A.CHANGE_MESSAGE_FILTER_VALUE,
    payload: value,
  };
}

export function pinMessage(messageId) {
  return {
    type: CS.PIN_MESSAGE,
    payload: messageId,
    send: true,
  };
}

export function unpinMessage(messageId) {
  return {
    type: CS.UNPIN_MESSAGE,
    payload: messageId,
    send: true,
  };
}

export function messagePinned(messageId) {
  return {
    type: A.PIN_MESSAGE,
    payload: messageId,
  };
}


export function messageUnpinned(messageId) {
  return {
    type: A.UNPIN_MESSAGE,
    payload: messageId,
  };
}
