const MESSAGE_MAX_LENGTH = 220;
const CHANNEL_NAME_MAX_LENGTH = 25;

const SC = {
  ADD_MESSAGE: 'SC_ADD_MESSAGE',
  ADD_CHANNEL: 'SC_ADD_CHANNEL',
  INIT: 'SC_INIT',
  SIGN_IN: 'SC_SIGN_IN',
  JOIN_TO_CHANNEL: 'SC_JOIN_TO_CHANNEL',
  TYPING: 'SC_TYPING',
  CHANGE_USER_INFO: 'SC_CHANGE_USER_INFO',
  SET_CHANNEL_HISTORY: 'SC_SET_CHANNEL_HISTORY',
  JOIN_USER: 'SC_JOIN_USER',
  ADD_DIRECT_CHANNEL: 'SC_ADD_DIRECT_CHANNEL',
  USER_ONLINE: 'SC_USER_ONLINE',
  USER_OFFLINE: 'SC_USER_OFFLINE',
  PIN_MESSAGE: 'SC_PIN_MESSAGE',
  UNPIN_MESSAGE: 'SC_UNPIN_MESSAGE',
  SET_CURRENT_CHANNEL: 'SC_SET_CURRENT_CHANNEL',
  SET_LINKS_INFO: 'SC_SET_LINKS_INFO',
};

const CS = {
  ADD_MESSAGE: 'CS_ADD_MESSAGE',
  ADD_CHANNEL: 'CS_ADD_CHANNEL',
  SET_FAVORITE_CHANNEL: 'CS_SET_FAVORITE_CHANNEL',
  SIGN_IN: 'CS_SIGN_IN',
  INIT: 'CS_INIT',
  JOIN_TO_CHANNEL: 'CS_JOIN_TO_CHANNEL',
  TYPING: 'CS_TYPING',
  CHANGE_USER_INFO: 'CS_CHANGE_USER_INFO',
  MARK_AS_READ: 'CS_MARK_AS_READ',
  ADD_DIRECT_CHANNEL: 'CS_ADD_DIRECT_CHANNEL',
  PIN_MESSAGE: 'PIN_MESSAGE',
  UNPIN_MESSAGE: 'UNPIN_MESSAGE',
  SET_CURRENT_CHANNEL: 'CS_SET_CURRENT_CHANNEL',
};

const A = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  REMOVE_CHANNEL: 'REMOVE_CHANNEL',
  SET_LOCAL_STATE: 'SET_LOCAL_STATE',
  SET_CURRENT_CHANNEL: 'SET_CURRENT_CHANNEL',
  ADD_DIRTY_CHANNEL: 'ADD_DIRTY_CHANNEL',
  ADD_DIRTY_DIRECT_CHANNEL: 'ADD_DIRTY_DIRECT_CHANNEL',
  REPLACE_DIRTY_DIRECT_CHANNEL: 'REPLACE_DIRTY_DIRECT_CHANNEL',
  REMOVE_DIRTY_DIRECT_CHANNEL: 'REMOVE_DIRTY_DIRECT_CHANNEL',
  INIT: 'INIT',
  INIT_USER: 'INIT_USER',
  LOG_OUT: 'LOG_OUT',
  JOIN_TO_CHANNEL: 'JOIN_TO_CHANNEL',
  REPLACE_DIRTY_CHANNEL: 'REPLACE_DIRTY_CHANNEL',
  REMOVE_DIRTY_CHANNEL: 'REMOVE_DIRTY_CHANNEL',
  TYPING: 'TYPING',
  CHANGE_USER_INFO: 'CHANGE_USER_INFO',
  LOAD_CHANNEL_HISTORY: 'LOAD_CHANNEL_HISTORY',
  JOIN_USER: 'JOIN_USER',
  CHANGE_MESSAGE_FILTER_VALUE: 'CHANGE_MESSAGE_FILTER_VALUE',
  USER_ONLINE: 'USER_ONLINE',
  USER_OFFLINE: 'USER_OFFLINE',
  PIN_MESSAGE: 'PIN_MESSAGE',
  UNPIN_MESSAGE: 'UNPIN_MESSAGE',
  SET_LINKS_INFO: 'SET_LINKS_INFO',
  DISCONNECT: 'DISCONNECT',
};

module.exports = {
  SC: SC,
  CS: CS,
  A: A,
  MESSAGE_MAX_LENGTH,
  CHANNEL_NAME_MAX_LENGTH,
};
