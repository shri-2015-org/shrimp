import React, {PropTypes} from 'react';
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
    messages: PropTypes.array.isRequired,
    channels: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    local: PropTypes.object.isRequired,
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
