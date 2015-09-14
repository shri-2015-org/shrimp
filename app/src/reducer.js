import {intiateState, addChannel, removeChannel, addMessage} from './core.js';

export default function reducer(state, action) {
  switch (action.type) {
  case 'INITIATE_STATE':
    return intiateState();
  case 'ADD_CHANNEL':
    return addChannel(state, action.channel);
  case 'REMOVE_CHANNEL':
    return removeChannel(state, action.channelId);
  case 'ADD_MESSAGE':
    return addMessage(state, action.message);
  default:
  	return state;
  }
}
