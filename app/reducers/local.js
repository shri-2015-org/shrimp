import {Map, fromJS} from 'immutable';
import {A} from '../../constants';

const EMPTY_MAP = Map();

export function local(state = EMPTY_MAP, action) {
  switch (action.type) {
  case A.SET_LOCAL_STATE:
    return action.payload;
  case A.SET_CURRENT_CHANNEL:
    return state.set('currentChannelId', action.payload);
  case A.INIT:
    return fromJS(action.payload.local);
  case A.INIT_USER:
    return state.set('user', action.payload.user);
  case A.LOG_OUT:
    return EMPTY_MAP;
  default:
    return state;
  }
}
