import {createStore} from 'redux';
import {appReducer} from './reducers/app_reducer';

export const store = createStore(appReducer);
