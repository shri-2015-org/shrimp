import {combineReducers} from 'redux';
import {channels} from './channels.js';
import {messages} from './messages.js';

export function appReducer() {
  return combineReducers({channels, messages});
}
