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


export function setChannelHistory(data) {
  return {
    type: A.SET_CHANNEL_HISTORY,
    payload: data,
  };
}

export function changeMessageFilterValue(value) {
  return {
    type: A.CHANGE_MESSAGE_FILTER_VALUE,
    payload: value,
  };
}
