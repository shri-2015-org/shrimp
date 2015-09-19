import React from 'react';
import {Provider} from 'react-redux';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import App from 'App';
import store from 'store';
import {bindActionCreators} from 'redux';


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

    const actions = bindActionCreators({ newMessage: newMessage }, store.dispatch);

    return (
      <div>
        <Provider store={store}>
          {() => <App {...actions} />}
        </Provider>
        {this.state.enableDevTools ? devTools : ''}
      </div>
    );
  }
}

React.render(<Root />, document.getElementById('root'));
