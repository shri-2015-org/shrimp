import {Map} from 'immutable';

const EMPTY_MAP = Map();

export function local(state = EMPTY_MAP, action) {
  switch (action.type) {
  case 'SET_LOCAL_STATE':
    return action.payload;
  case 'SET_CURRENT_CHANNEL':
    return state.set('currentChannelId', action.payload);
  default:
    return state;
  }
}
