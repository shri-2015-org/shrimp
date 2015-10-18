import {List, fromJS} from 'immutable';
import {A} from '../../constants';

const EMPTY_LIST = List();

export function messages(state = EMPTY_LIST, action = null) {
  switch (action.type) {
  case A.INIT:
    return fromJS(action.payload.messages);
  case A.ADD_MESSAGE:
    return state.push(action.message);
  case A.EDIT_MESSAGE:
    const i = state.findIndex(item => item.get('id') === action.payload.get('id'));
    if (i > -1) {
      return state.set(i, action.payload);
    }
    return state;
  case A.LOG_OUT:
    return EMPTY_LIST;
  case A.LOAD_CHANNEL_HISTORY:
    const newMessages = fromJS(action.payload.messages)
      .filter(message => !state.find(m => m.get('id') === message.get('id')));
    return state.concat(newMessages);
  default:
    return state;
  }
}
