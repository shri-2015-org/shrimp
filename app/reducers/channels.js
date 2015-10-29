import {List, Map, fromJS} from 'immutable';
import {A, CS} from '../../constants';

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
    const channelIndex = state.findIndex(item => item.get('id') === action.payload.channelId);
    const channelItem = state.find(item => item.get('id') === action.payload.channelId);
    if (!channelItem || !channelItem.get('users')) {
      return state;
    }
    if (channelItem.get('users').find(u => u.get('_id') === action.payload.userId)) {
      return state;
    }
    if (action.payload.time) {
      return state.set(channelIndex, state.get(channelIndex).set('users', state.get(channelIndex).get('users').push(new Map({_id: action.payload.userId, lastSeen: action.payload.time}))));
    }
    return state.set(channelIndex, state.get(channelIndex).set('users', state.get(channelIndex).get('users').push(new Map({_id: action.payload.userId, lastSeen: Date.now()}))));

  case CS.MARK_AS_READ:
    const channelIndex1 = state.map(item => item.get('id')).indexOf(action.payload.channelId);
    return state.setIn([channelIndex1, 'lastSeen'], action.payload.lastSeen);

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

  case A.REMOVE_DIRTY_CHANNEL:
    return state.filter(item => !item.get('isDirty'));

  case CS.SET_FAVORITE_CHANNEL:
    const foundIndex = state.findIndex(item => item.get('id') === action.payload.channelId);
    return state.set(foundIndex, state.get(foundIndex).set('isFavorite', action.payload.isFavorite));

  case A.ADD_DIRTY_DIRECT_CHANNEL:
    return state.unshift(new Map({isDirect: true, isDirty: true, dirtyName: action.payload}));

  case A.REMOVE_DIRTY_DIRECT_CHANNEL:
    return state.shift();

  default:
    return state;
  }
}
