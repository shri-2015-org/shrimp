import {List, fromJS} from 'immutable';

const EMPTY_LIST = List();

export function channels(state = EMPTY_LIST, action = {type: 'DEFAULT'}) {
  switch (action.type) {
  case 'INIT':
    return fromJS(action.payload.channels);
  case 'ADD_CHANNEL':
    return state.push(action.channel);
  case 'REMOVE_CHANNEL':
    const index = state.map(item => item.get('id')).indexOf(action.channelId);
    return state.delete(index);
  default:
    return state;
  }
}
