import Server from 'socket.io';
import getInitState from './initial-state';
import getMessageModel from './models/message';
// import getUserModel from './models/user';
import {SC, CS} from '../constants';
import {signInUser} from './db/db_core.js';
// const debug = require('debug')('shrimp:server');
const Message = getMessageModel();
// const User = getUserModel();

export default function startSocketServer(http) {
  const io = new Server(http);

  io.on('connection', socket => {
    socket.on(CS.SIGN_IN, data => {
      signInUser(data.login, data.password, (userData) => {
        if (userData.status.type === 'success') {
          getInitState(userData.userId).then(initState => {
            socket.emit(SC.INIT, initState);
          });
        } else {
          socket.emit(SC.SIGN_IN, {user: userData});
        }
      });
    });

    socket.on(CS.ADD_MESSAGE, data => {
      Message.add(data, (err, result) => {
        io.sockets.emit(SC.ADD_MESSAGE, result.toObject());
      });
    });

    socket.on(CS.ADD_CHANNEL, data => {
      io.sockets.emit(SC.ADD_CHANNEL, {id: 0, name: data.text});
    });
  });
}
