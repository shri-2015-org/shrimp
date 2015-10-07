import React from 'react';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';
import store from 'store';
import routes from 'routes';
import cookies from 'browser-cookies';


export default class Root extends React.Component {

  render() {
    debugger;
    const cookieSessionId = cookies.get('sessionId');
    if (!cookieSessionId) {
      if (location.pathname !== '/login' && location.pathname !== '/signup') {
        store.history.pushState(null, '/login');
      }
    }

    const devTools = (() => {
      if (OPTIMIZED) {
        return null;
      }
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
      return (
        <DebugPanel top right bottom>
          <DevTools
            store={store}
            monitor={LogMonitor}
            visibleOnLoad={document.cookie.indexOf('enableDevTools=true') !== -1}
          />
        </DebugPanel>
      );
    }());

    return (
      <div>
        <Provider store={store}>
          {() => <ReduxRouter routes={routes} />}
        </Provider>
        {devTools}
      </div>
    );
  }
}

React.render(<Root />, document.getElementById('root'));
