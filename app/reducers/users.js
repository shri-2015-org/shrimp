import {List, fromJS} from 'immutable';
import {A} from '../../constants';

const EMPTY_LIST = List();

export function users(state = EMPTY_LIST, action) {
  switch (action.type) {
  case A.INIT:
    return fromJS(action.payload.users);
  case A.CHANGE_USER_INFO:
    const index = state.map(item => item.get('id')).indexOf(action.payload.user.id);
    return state.set(index, fromJS(action.payload.user));
  default:
    return state;
  }
}
