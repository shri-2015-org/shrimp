import {List, Map} from 'immutable';

export function setChannels(state, channels) {
    return state.set('channles', List(channels));
}

export function addUserToChannel(state, userId) {
    
}