import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import {startSocketClient} from 'core/socket';
import Messages from 'components/Messages';
import Header from 'components/Header';
import Threads from 'components/Threads';
import 'styles/main.scss';
import {bindActionCreators} from 'redux';
import * as actionsMessages from 'actions/messages.js';
import * as actionsLocal from 'actions/local.js';
import {currentChannelMessagesSelector} from 'selectors/messagesSelector';


startSocketClient();

@connect(state => ({
  messages: currentChannelMessagesSelector(state),
  channels: state.channels,
  users: state.users,
  local: state.local,
}))
export default class Application extends React.Component {
  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    channels: PropTypes.instanceOf(List).isRequired,
    users: PropTypes.instanceOf(List).isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
    dispatch: PropTypes.func.isRequired,
  }


  render() {
    const {messages, channels, users, local, dispatch} = this.props;
    const actionsCombine = Object.assign(actionsMessages, actionsLocal);
    const actions = bindActionCreators(actionsCombine, dispatch);

    return (
      <div className='chat-page'>
        <Header />
        <Threads channels={channels} users={users} local={local} {...actions}/>
        <Messages messages={messages} local={local} {...actions} />
      </div>
    );
  }
}
