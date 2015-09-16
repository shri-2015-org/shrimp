import Server from 'socket.io';
// const debug = require('debug')('shrimp:server');


export default function startSocketServer(store) {
  const io = new Server().attach(8090);

  // if (store) {
  //   store.subscribe(
  //     () => io.emit('state', store.getState().toJS())
  //   );

    io.on('connection', (socket) => {
      // socket.emit('state', store.getState().toJS());
      // socket.on('action', store.dispatch.bind(store));

      socket.on('NEW_MESSAGE', (data) => {
        console.log(data);
        io.sockets.emit('ADD_MESSAGE', {id: 0, channelId: data.channelId, senderId: data.senderId, text: data.text})
      })

      socket.on('NEW_CHANNEL', (data) => {
        console.log(data);
        io.sockets.emit('NEW_CHANNEL', {id: 0, name: data.text});
      })
    });
  // }
}
