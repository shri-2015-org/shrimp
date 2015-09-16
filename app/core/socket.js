import io from 'socket.io-client';
import {store} from '../store';
import {Map, List} from 'immutable';
import {addChannel} from '../actions/channels';
import {addMessage} from '../actions/messages';
import {newMessage, newChannel} from './core.js';

export const socket = io('http://localhost:8090');

export function startSocketClient() {

  socket.on('ADD_MESSAGE', (data) => {
    console.log(data);
    store.dispatch(addMessage(Map({id: 0, channelId: 0, senderId: 0, text: 'test message'})));
  });

  socket.on('ADD_CHANNEL', (data) => {
    console.log(data);
    store.dispatch(addChannel(Map({id: 1, name: '1 channel'})));
  });
}


