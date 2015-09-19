import io from 'socket.io-client';
import store from '../store';
import {Map} from 'immutable';
import {addChannel} from '../actions/channels';
import {addMessage} from '../actions/messages';

export const socket = io();

export function startSocketClient() {
  socket.on('ADD_MESSAGE', (data) => {
    store.dispatch(addMessage(Map({id: 0, channelId: 0, senderId: 0, text: data.text})));
  });

  socket.on('ADD_CHANNEL', (data) => {
    store.dispatch(addChannel(Map({id: 1, name: data.name})));
  });

  socket.on('GET_INIT_STATE', (data) => {
    return data;
  });
}
