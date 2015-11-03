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
  case A.JOIN_USER:
    const joinedUserIndex = state.findIndex(item => item.get('id') === action.payload.user.id);
    return (joinedUserIndex !== -1) ? state : state.push(fromJS(action.payload.user));
  case A.USER_ONLINE:
    return state.map(user =>
      user.get('id') === action.payload.userId
        ? user.set('isOnline', true)
        : user);
  case A.USER_OFFLINE:
    return state.map(user =>
      user.get('id') === action.payload.userId
        ? user.set('isOnline', false)
        : user);
  default:
    return state;
  }
}
