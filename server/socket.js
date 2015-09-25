import Server from 'socket.io';
import getInitState from './initial-state.js';
// const debug = require('debug')('shrimp:server');
import getMessageModel from './models/message';
const Message = getMessageModel();

export default function startSocketServer(http) {
  const io = new Server(http);

  io.on('connection', (socket) => {
    getInitState().then((initState) => {
      socket.emit('INIT', initState);
    });
    socket.on('NEW_MESSAGE', (data) => {
      Message.add(data, (err, result) => {
        io.sockets.emit('ADD_MESSAGE', result.toObject());
      });
    });
    socket.on('NEW_CHANNEL', (data) => {
      io.sockets.emit('ADD_CHANNEL', {id: 0, name: data.text});
    });
  });
}
