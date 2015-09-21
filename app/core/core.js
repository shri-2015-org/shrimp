export function newChannel() {
  socket.emit('NEW_CHANNEL', {});
}
