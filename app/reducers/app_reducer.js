import {routerStateReducer} from 'redux-router';
import {combineReducers} from 'redux';
import {channels} from './channels';
import {messages} from './messages';
import {users} from './users';
import {local} from './local';

export const appReducer = combineReducers({
  router: routerStateReducer,
  channels,
  messages,
  users,
  local,
});
