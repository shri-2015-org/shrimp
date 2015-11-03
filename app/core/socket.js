import io from 'socket.io-client';
import store from '../store';
import {fromJS} from 'immutable';
import {addChannel, addUserToChannel} from '../actions/channels';
import {addMessage, loadChannelHistory, messagePinned, messageUnpinned, setLinksInfo} from '../actions/messages';
import {init, initUser, logOut, disconnect, setCurrentChannel} from '../actions/local';
import {setUserInfo, joinUser, setUserOnline, setUserOffline} from 'actions/users';
import {SC, CS} from '../../constants';


export function socketClient(type = null, socketData) {
  const socket = io();

  if (type === 'SOCKET_INIT') {
    socket.on(SC.ADD_MESSAGE, (data) => {
      store.dispatch(addMessage(fromJS(data)));
    });


    socket.on(SC.ADD_CHANNEL, (data) => {
      store.dispatch(addChannel(fromJS({id: data.id, name: data.name, users: data.users})));
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
      store.dispatch(addUserToChannel(data));
    });


    socket.on(SC.CHANGE_USER_INFO, (data) => {
      store.dispatch(setUserInfo(data));
    });


    socket.on(SC.SET_CURRENT_CHANNEL, (data) => {
      store.dispatch(setCurrentChannel(data));
    });


    socket.on(SC.SET_CHANNEL_HISTORY, (data) => {
      store.dispatch(loadChannelHistory(data));
    });


    socket.on(SC.USER_ONLINE, (data) => {
      store.dispatch(setUserOnline(data));
    });


    socket.on(SC.USER_OFFLINE, (data) => {
      store.dispatch(setUserOffline(data));
    });

    socket.on(SC.PIN_MESSAGE, (data) => {
      store.dispatch(messagePinned(data));
    });

    socket.on(SC.UNPIN_MESSAGE, (data) => {
      store.dispatch(messageUnpinned(data));
    });

    socket.on(SC.SET_LINKS_INFO, (data) => {
      store.dispatch(setLinksInfo(data));
    });

    socket.on(SC.ADD_DIRECT_CHANNEL, (data) => {
      store.dispatch(addChannel(fromJS({
        id: data.id,
        name: data.name,
        users: data.users,
        isDirect: data.isDirect,
        lastSeen: data.lastSeen,
      })));
    });


    socket.on('error', () => {
      store.dispatch(logOut());
    });

    socket.on('disconnect', () => {
      store.dispatch(disconnect());
    });

    socket.on('reconnect', () => {
      socket.emit(CS.INIT);
    });
  } else if (type) {
    socket.emit(type, socketData);
  }
}
