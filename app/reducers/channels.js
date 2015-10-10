import {List, Map, fromJS} from 'immutable';
import {A} from '../../constants';

const EMPTY_LIST = List();

export function channels(state = EMPTY_LIST, action = {type: 'DEFAULT'}) {
  switch (action.type) {
  case A.INIT:
    return fromJS(action.payload.channels);
  case A.ADD_CHANNEL:
    const dirtyChannelIndex = state.findIndex(item => item.get('isDirty') && action.channel.get('name') === item.get('name'));
    if (dirtyChannelIndex !== -1) {
      return state.set(dirtyChannelIndex, action.channel);
    }
    return state.push(action.channel);
  case A.REMOVE_CHANNEL:
    const index = state.map(item => item.get('id')).indexOf(action.channelId);
    return state.delete(index);
  case A.JOIN_TO_CHANNEL:
    const channelIndex = state.map(item => item.get('id')).indexOf(action.payload.channelId);
    state.getIn([channelIndex, 'userIds']).push(action.payload.userId);
    return state;
  case A.REPLACE_DIRTY_CHANNEL:
    const i = state.findIndex(item => item.get('isDirty'));
    if (i === -1) {
      return state;
    }
    return state.set(i, action.payload);
  case A.ADD_DIRTY_CHANNEL:
    const existingItems = state.filter(item => item.get('isDirty'));
    if (existingItems.size > 0) {
      return state;
    }
    return state.unshift(new Map({isDirty: true}));
  default:
    return state;
  }
}
