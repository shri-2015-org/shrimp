import Server from 'socket.io';
import cookieParser from 'socket.io-cookie';
import validate from 'valuedate';
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
        socket.broadcast.emit(SC.JOIN_USER, { user: user.toObject() });
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
      if (!validate(channelId).isString().match(/^[0-9a-fA-F]{24}$/).end()) return;
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


    socket.on(CS.ADD_MESSAGE, ({senderId, channelId, text}) => {
      if (!(
        validate(senderId).isString().match(/^[0-9a-fA-F]{24}$/).end() &&
        validate(channelId).isString().match(/^[0-9a-fA-F]{24}$/).end() &&
        validate(text).isString().inRange(0, 1000).end()
      )) return;
      Message.add({ senderId, channelId, text }, (err, result) => {
        io.to(channelId).emit(SC.ADD_MESSAGE, result.toObject());
      });
    });


    socket.on(CS.ADD_CHANNEL, ({name}) => {
      if (!(
        validate(name).isString().inRange(1, 30).end()
      )) return;
      Channel.add({name}, (err, result) =>
        io.sockets.emit(SC.ADD_CHANNEL, result.toObject()));
    });


    socket.on(CS.TYPING, ({id}) => {
      if (!validate(id).isString().match(/^[0-9a-fA-F]{24}$/).end()) return;
      io.socket.emit(SC.TYPING, {channelId: id, typing: true});
    });


    socket.on(CS.SET_FAVORITE_CHANNEL, ({id}) => {
      if (!validate(id).isString().match(/^[0-9a-fA-F]{24}$/).end()) return;
      setFavoriteChannel(socket.sessionId, {id});
    });


    socket.on(CS.CHANGE_USER_INFO, ({email, name, language}) => {
      if (!(
        validate(email).isString().isEmail().inRange(1, 50).end() &&
        validate(name).isString().inRange(1, 100).end() &&
        validate(language).isString().inRange(1, 4).end()
      )) return;
      setUserInfo(socket.sessionId, email, name, language, (userData) => {
        socket.emit(SC.CHANGE_USER_INFO, {user: userData});
      });
    });


    socket.on(CS.MARK_AS_READ, ({channelId}) => {
      if (!validate(channelId).isString().match(/^[0-9a-fA-F]{24}$/).end()) return;
      User.getBySessionId(socket.sessionId)
      .then((user) => {
        Channel.markAsRead({channelId}, user.id);
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

    socket.on(CS.ADD_DIRECT_CHANNEL, ({name, userIds}) => {
      if (!(
        validate(name).isString().isEmail().inRange(1, 50).end() &&
        userIds.length === 2 &&
        userIds.reduce((p, n) => p && validate(n).isString().inRange(1, 50).end(), true)
      )) return;

      Channel.addDirectChannel({name, userIds}, (err, result) => {
        const channelId = result._id;
        Promise.all(({name, userIds}).userIds.map(uid => User.getById(uid)))
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
