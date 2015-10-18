import {A} from '../../constants';

export function setUserInfo(data) {
  return {
    type: A.CHANGE_USER_INFO,
    payload: data,
  };
}


export function joinUser(data) {
  return {
    type: A.JOIN_USER,
    payload: data,
  };
}


export function setUserOnline(data) {
  return {
    type: A.USER_ONLINE,
    payload: data,
  };
}


export function setUserOffline(data) {
  return {
    type: A.USER_OFFLINE,
    payload: data,
  };
}
