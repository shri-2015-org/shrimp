import {compose, createStore, applyMiddleware} from 'redux';
import {devTools, persistState} from 'redux-devtools';
import {appReducer} from 'reducers/app_reducer';
import {socket} from 'core/socket';

import {reduxReactRouter} from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';


const middleware = () => next => action => {
  debugger;
  if (action.send) {
    socket.emit(action.type, action.payload);
  }
  return next(action);
};

const store = compose(
  applyMiddleware(middleware),
  reduxReactRouter({createHistory}),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
)(createStore)(appReducer);

export default store;
