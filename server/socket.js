import Server from 'socket.io';
import getInitState from './initial-state';
import getMessageModel from './models/message';
import {SC, CS} from '../constants';
// const debug = require('debug')('shrimp:server');
const Message = getMessageModel();

export default function startSocketServer(http) {
  const io = new Server(http);

  io.on('connection', socket => {
    getInitState().then(initState => {
      socket.emit(SC.INIT, initState);
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
