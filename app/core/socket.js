import io from 'socket.io-client';
import store from '../store';
import {Map} from 'immutable';
import {addChannel} from '../actions/channels';
import {addMessage} from '../actions/messages';
import {init, initUser} from '../actions/local';
import {SC} from '../../constants';

export const socket = io();

export function startSocketClient() {
  socket.on(SC.ADD_MESSAGE, (data) => {
    store.dispatch(addMessage(Map(data)));
  });

  socket.on(SC.ADD_CHANNEL, (data) => {
    store.dispatch(addChannel(Map({id: 1, name: data.name})));
  });

  socket.on(SC.INIT, (data) => {
    store.dispatch(init(data));
  });

  socket.on(SC.SIGN_IN, (data) => {
    store.dispatch(initUser(data));
  });
}
