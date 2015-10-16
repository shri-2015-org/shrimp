import {A} from '../../constants';

const initMessagesFilterValue = '';

export function messagesFilterValue(state = initMessagesFilterValue, action = null) {
  switch (action.type) {
  case A.CHANGE_MESSAGE_FILTER_VALUE:
    return action.payload;
  default:
    return state;
  }
}
