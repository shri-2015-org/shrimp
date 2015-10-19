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

export function sendEditedMessage(data) {
  return {
    type: CS.EDIT_MESSAGE,
    payload: data,
    send: true,
  };
}

export function setEditedMessage(data) {
  return {
    type: A.EDIT_MESSAGE,
    payload: data,
  };
}
