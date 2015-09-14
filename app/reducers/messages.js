import {List} from 'immutable';

const EMPTY_LIST = List();

export function messages(state = EMPTY_LIST, action) {
  switch (action.type) {
  case 'ADD_MESSAGE':
    return state.push(action.message);
  default:
    return state;
  }
}
