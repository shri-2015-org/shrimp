import {List, Map} from 'immutable';

export function setChannels (state, channels) {
  return state.set('channels', channels);
}

export function addUserToChannel (state)