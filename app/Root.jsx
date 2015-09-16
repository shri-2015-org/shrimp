import React from 'react';
import {Provider} from 'react-redux';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import App from './App';
import store from './store';


// test data
import {Map, List} from 'immutable';
import {addChannel} from './actions/channels';
import {addMessage} from './actions/messages';
store.dispatch(addChannel(Map({id: 0, name: '0 channel', userIds: List.of(0) })));
store.dispatch(addMessage(Map({id: 0, channelId: 0, senderId: 0, text: 'test message'})));
store.dispatch(addMessage(Map({id: 1, channelId: 0, senderId: 1, text: 'test message1'})));
store.dispatch(addMessage(Map({id: 2, channelId: 0, senderId: 0, text: 'test message2'})));
store.dispatch(addMessage(Map({id: 3, channelId: 0, senderId: 1, text: 'test message3'})));
// end test data

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <App />}
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}

React.render(<Root />, document.getElementById('root'));
