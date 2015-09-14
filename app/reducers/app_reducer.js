import {combineReducers} from 'redux';
import {channels} from './channels.js';
import {messages} from './messages.js';

export const appReducer = combineReducers({channels, messages});
