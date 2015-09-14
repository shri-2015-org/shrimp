import {combineReducers} from 'redux';
import {channels} from './reducers/channels';
import {messages} from './reducers/messages';

export const appReducer = combineReducers({channels, messages});
