import {List, fromJS} from 'immutable';
import {A} from '../../constants';

const EMPTY_LIST = List();

export function messages(state = EMPTY_LIST, action) {
  switch (action.type) {
  case A.INIT:
    return fromJS(action.payload.messages);
  case A.ADD_MESSAGE:
    return state.push(action.message);
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
