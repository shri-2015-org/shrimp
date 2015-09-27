import React from 'react';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';
import store from 'store';
import routes from 'routes';


export default class Root extends React.Component {

  render() {
    const devTools = (() => {
      if (OPTIMIZED) {
        return null;
      }
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
      return (
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
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
