import {List, fromJS} from 'immutable';
import {A} from '../../constants';

const EMPTY_LIST = List();

export function channels(state = EMPTY_LIST, action = {type: 'DEFAULT'}) {
  switch (action.type) {
  case A.INIT:
    return fromJS(action.payload.channels);
  case A.ADD_CHANNEL:
    return state.push(action.channel);
  case A.REMOVE_CHANNEL:
    const index = state.map(item => item.get('id')).indexOf(action.channelId);
    return state.delete(index);
  case A.JOIN_TO_CHANNEL:
    const channelIndex = state.map(item => item.get('id')).indexOf(action.payload.channelId);
    state.getIn([channelIndex, 'userIds']).push(action.payload.userId);
    return state;
  default:
    return state;
  }
}
