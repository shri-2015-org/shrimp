import {combineReducers} from 'redux';
import {channels} from './channels.js';
import {messages} from './messages.js';

export function appReducer(state, action) {
  switch (action.type) {
  default:
    return combineReducers({channels, messages});
  }
}
