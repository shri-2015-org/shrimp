import {socket} from './socket';

export function newMessage (data) {
  socket.emit('NEW_MESSAGE', {channelId: 0, senderId: 0, text: data.text});
}

export function newChannel (data) {
  socket.emit('NEW_CHANNEL', {})
}

