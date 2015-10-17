import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';
import store from 'store';
import routes from 'routes';
// import cookies from 'browser-cookies';


export default class Root extends React.Component {

  render() {
    const devTools = (() => {
      if (OPTIMIZED) {
        return null;
      }
      return null;
      // wait DevTools for React 14 release
      // const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
      // return (
      //   <DebugPanel top right bottom>
      //     <DevTools
      //       store={store}
      //       monitor={LogMonitor}
      //       visibleOnLoad={cookies.get('enableDevTools')}
      //     />
      //   </DebugPanel>
      // );
    }());

    return (
      <div>
        <Provider store={store}>
          <ReduxRouter routes={routes} />
        </Provider>
        {devTools}
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
