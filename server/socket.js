import Server from 'socket.io';
import cookieParser from 'socket.io-cookie';
import getInitState from './initial-state';
import getMessageModel from './models/message';
import getChannelModel from './models/channel';
import getUserModel from './models/user';
import {SC, CS} from '../constants';
import {checkSessionId, setUserInfo, joinToChannel, setFavoriteChannel, loadChannelHistory} from './db/db_core.js';
// const debug = require('debug')('shrimp:server');
const Message = getMessageModel();
const Channel = getChannelModel();
const User = getUserModel();


export default function startSocketServer(http) {
  const io = new Server(http);

  io.use(cookieParser);

  io.use((socket, callback) => {
    if (socket.request.headers.cookie) {
      const sessionId = socket.request.headers.cookie.sessionId;
      checkSessionId(sessionId).then(() => {
        socket.sessionId = sessionId;
        callback();
      }).catch((exception) => {
        callback(new Error(exception));
      });
    }
  });

  io.on('connection', socket => {
    User.getBySessionId(socket.sessionId)
      .then((user) => {
        return Channel.getForUser(user.id);
      })
      .then((channels) => {
        channels.forEach(c => {
          socket.join(c.id);
        });
      });


    socket.on(CS.INIT, () => {
      getInitState(socket.sessionId).then(initState => {
        socket.emit(SC.INIT, initState);
      });
    });


    socket.on(CS.JOIN_TO_CHANNEL, channelId => {
      joinToChannel(socket.sessionId, channelId, (userId) => {
        socket.join(channelId);
        socket.emit(SC.JOIN_TO_CHANNEL, {channelId, userId});
        loadChannelHistory(channelId, (messages) => {
          if (messages.length) {
            const messagesObj = messages.map((message) => message.toObject());
            socket.emit(SC.SET_CHANNEL_HISTORY, { messages: messagesObj });
          }
        });
      });
    });


    socket.on(CS.ADD_MESSAGE, data => {
      Message.add(data, (err, result) => {
        io.to(data.channelId).emit(SC.ADD_MESSAGE, result.toObject());
      });
    });


    socket.on(CS.ADD_CHANNEL, data => {
      Channel.add(data, (err, result) =>
        io.sockets.emit(SC.ADD_CHANNEL, result.toObject()));
    });


    socket.on(CS.TYPING, data => {
      io.socket.emit(SC.TYPING, {channelId: data.id, typing: true});
    });


    socket.on(CS.SET_FAVORITE_CHANNEL, data => {
      // setFavoriteChannel(socket.sessionId, data.channelId, data.status);
      setFavoriteChannel(socket.sessionId, data);
    });


    socket.on(CS.CHANGE_USER_INFO, data => {
      setUserInfo(socket.sessionId, data.email, data.name, (userData) => {
        socket.emit(SC.CHANGE_USER_INFO, {user: userData});
      });
    });


    socket.on(CS.MARK_AS_READ, data => {
      User.getBySessionId(socket.sessionId)
      .then((user) => {
        Channel.markAsRead(data, user.id);
      });
    });

    function findClientsSocket(roomId, namespace) {
      const res = [];
      const ns = io.of(namespace || '/');    // the default namespace is "/"

      if (ns) {
        for (const id in ns.connected) {
          if (roomId) {
            if (ns.connected[id].rooms.indexOf(roomId) !== -1) {
              res.push(ns.connected[id]);
            }
          } else {
            res.push(ns.connected[id]);
          }
        }
      }
      return res;
    }

    socket.on(CS.ADD_DIRECT_CHANNEL, data => {
      Channel.addDirectChannel(data, (err, result) => {
        const channelId = result._id;
        Promise.all(data.userIds.map(uid => User.getById(uid)))
          .then(users => {
            const sessionIds = new Set(users.map(u => u.sessionId));
            const clients = findClientsSocket();
            clients.filter(c => sessionIds.has(c.sessionId)).forEach(c => c.join(channelId));
            io.to(channelId).emit(SC.ADD_DIRECT_CHANNEL, result.toObject());
          });
      });
    });
  });
}
