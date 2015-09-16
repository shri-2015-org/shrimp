import React from 'react';
import MessageList from './components/message-list';
import MessageBox from './components/message-box';
import {store} from './store';
import {Map, List} from 'immutable';
import {addChannel} from './actions/channels';
import {addMessage} from './actions/messages';

// Put some dummy data to store
store.dispatch(addChannel(Map({id: 0, name: '0 channel', userIds: List.of(0) })));
store.dispatch(addMessage(Map({id: 0, channelId: 0, senderId: 0, text: 'test message'})));
store.dispatch(addMessage(Map({id: 1, channelId: 0, senderId: 1, text: 'test message1'})));
store.dispatch(addMessage(Map({id: 2, channelId: 0, senderId: 0, text: 'test message2'})));
store.dispatch(addMessage(Map({id: 3, channelId: 0, senderId: 1, text: 'test message3'})));

const msgs = store.getState().messages;

export default class Application extends React.Component {
  render() {
    return (
      <div>
        <MessageList messages={msgs}/>
        <MessageBox />
      </div>
    );
  }
}

React.render(<Application />, document.getElementById('root'));
