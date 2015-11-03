import {A, CS} from '../../constants';

export function setLocalState(state) {
  return {
    type: A.SET_LOCAL_STATE,
    payload: state,
  };
}


export function changeCurrentChannel(channelId) {
  return {
    type: CS.SET_CURRENT_CHANNEL,
    payload: channelId,
    send: true,
  };
}


export function setCurrentChannel(channelId) {
  return {
    type: A.SET_CURRENT_CHANNEL,
    payload: channelId,
  };
}


export function init(data) {
  return {
    type: A.INIT,
    payload: data,
  };
}

export function getInitData(data) {
  return {
    type: CS.INIT,
    payload: data,
    send: true,
  };
}

export function signIn(data) {
  return {
    type: CS.SIGN_IN,
    payload: data,
    send: true,
  };
}

export function initUser(data) {
  return {
    type: A.INIT_USER,
    payload: data,
  };
}


export function logOut() {
  return {
    type: A.LOG_OUT,
    payload: null,
  };
}


export function disconnect() {
  return {
    type: A.DISCONNECT,
    payload: null,
  };
}


export function changeUserInfo(data) {
  return {
    type: CS.CHANGE_USER_INFO,
    payload: data,
    send: true,
  };
}
