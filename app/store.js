import {createStore, combineReducers} from 'redux';
import {channels} from './reducers/channels';
import {messages} from './reducers/messages';

const reducer = combineReducers({channels, messages});
export const store = createStore(reducer);
