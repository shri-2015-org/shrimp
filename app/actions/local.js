import {A} from '../../constants';

export function setLocalState(state) {
  return {
    type: A.SET_LOCAL_STATE,
    payload: state,
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
