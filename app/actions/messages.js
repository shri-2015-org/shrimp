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
