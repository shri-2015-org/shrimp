import {List, fromJS} from 'immutable';

const EMPTY_LIST = List();

export function users(state = EMPTY_LIST, action) {
  switch (action.type) {
  case 'INIT':
    return fromJS(action.payload.users);
  default:
    return state;
  }
}
