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

/*
@connect(state => ({ messages: state.messages, channels: state.channels.toJS(), users: state.users.toJS() }))
*/
@connect(currentChannelMessagesSelector)


class Application extends React.Component {

  static propTypes = {
    // TODO: add good validation
    messages: PropTypes.array.isRequired,
    channels: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    local: PropTypes.object.isRequired,
    newMessage: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }


  render() {
    const {messages, channels, users, local} = this.props;
    const actionsCombine = Object.assign(actionsMessages, actionsLocal);
    const actions = bindActionCreators(actionsCombine, this.props.dispatch);

    return (
      <div className='chat-page'>
        <Header />
        <Threads channels={channels.toJS()} users={users.toJS()} local={local} {...actions}/>
        <Messages messages={messages} local={local} {...actions} />
      </div>
    );
  }
}

export default Application;
