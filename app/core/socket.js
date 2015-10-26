import io from 'socket.io-client';
import store from '../store';
import {Map} from 'immutable';
import * as channelActions from '../actions/channels';
import * as messageActions from '../actions/messages';
import {setUserInfo, joinUser} from 'actions/users';
import {init, initUser, logOut} from '../actions/local';
import {SC} from '../../constants';


export function socketClient(type = null, socketData) {
  const socket = io();

  if (type === 'SOCKET_INIT') {
    socket.on(SC.ADD_MESSAGE, (data) => {
      store.dispatch(messageActions.addMessage(Map(data)));
    });


    socket.on(SC.ADD_CHANNEL, (data) => {
      store.dispatch(channelActions.addChannel(Map({id: data.id, name: data.name, joined: false})));
    });


    socket.on(SC.JOIN_USER, (data) => {
      store.dispatch(joinUser(data));
    });


    socket.on(SC.INIT, (data) => {
      store.dispatch(init(data));
    });


    socket.on(SC.SIGN_IN, (data) => {
      store.dispatch(initUser(data));
    });


    socket.on(SC.JOIN_TO_CHANNEL, (data) => {
      store.dispatch(channelActions.addUserToChannel(data));
    });


    socket.on(SC.CHANGE_USER_INFO, (data) => {
      store.dispatch(setUserInfo(data));
    });


    socket.on(SC.SET_CHANNEL_HISTORY, (data) => {
      store.dispatch(messageActions.setChannelHistory(data));
      store.dispatch(channelActions.setLoadingStatus({channelId: data.messages[0].channelId, status: data.messages[0].timestamp}));
    });


    socket.on(SC.ADD_DIRECT_CHANNEL, (data) => {
      store.dispatch(channelActions.addChannel(Map({
        id: data.id,
        name: data.name,
        users: data.users,
        isDirect: data.isDirect,
      })));
    });


    socket.on('error', () => {
      store.dispatch(logOut());
    });
  } else if (type) {
    socket.emit(type, socketData);
  }
}
