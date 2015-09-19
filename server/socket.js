import Server from 'socket.io';
import InitState from './initial-state.json';
// const debug = require('debug')('shrimp:server');


export default function startSocketServer() {
  const io = new Server().attach(8090);

  // if (store) {
  //   store.subscribe(
  //     () => io.emit('state', store.getState().toJS())
  //   );

  io.on('connection', (socket) => {
    socket.on('NEW_MESSAGE', (data) => {
      io.sockets.emit('ADD_MESSAGE', {id: 0, channelId: data.channelId, senderId: data.senderId, text: data.text});
    });

    socket.on('NEW_CHANNEL', (data) => {
      io.sockets.emit('NEW_CHANNEL', {id: 0, name: data.text});
    });
    socket.on('CALL_INIT_STATE', () => {
      socket.emit('GET_INIT_STATE', InitState);
    });
  });
  // }
}
