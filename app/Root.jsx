import React from 'react';
import {Provider} from 'react-redux';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import App from 'App';
import store from 'store';


export default class Root extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      enableDevTools: false,
    };
  }


  componentDidMount() {
    this.setState({
      enableDevTools: document.cookie.indexOf('enableDevTools=true') !== -1,
    });
  }


  render() {
    const devTools = (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );

    return (
      <div>
        <Provider store={store}>
          {() => <App dispatch={store.dispatch} />}
        </Provider>
        {this.state.enableDevTools ? devTools : ''}
      </div>
    );
  }
}

React.render(<Root />, document.getElementById('root'));
