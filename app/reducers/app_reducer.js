import {combineReducers} from 'redux';
import {channels} from './channels';
import {messages} from './messages';
import {local} from './local';

export const appReducer = combineReducers({channels, messages, local});
