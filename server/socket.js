import Server from 'socket.io';
import InitState from './initial-state.json';
// const debug = require('debug')('shrimp:server');


export default function startSocketServer(http) {
  const io = new Server(http);

  io.on('connection', (socket) => {
    socket.emit('INIT', InitState);


    socket.on('NEW_MESSAGE', (data) => {
      io.sockets.emit('ADD_MESSAGE', {id: 0, channelId: data.channelId, senderId: data.senderId, text: data.text});
    });


    socket.on('NEW_CHANNEL', (data) => {
      io.sockets.emit('ADD_CHANNEL', {id: 0, name: data.text});
    });
  });
}
