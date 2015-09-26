import {List, fromJS} from 'immutable';
import {A} from '../../constants';

const EMPTY_LIST = List();

export function users(state = EMPTY_LIST, action) {
  switch (action.type) {
  case A.INIT:
    return fromJS(action.payload.users);
  default:
    return state;
  }
}
