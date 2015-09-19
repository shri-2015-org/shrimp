import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {startSocketClient} from 'core/socket';
import Messages from 'components/Messages';
import Header from 'components/Header';
import Threads from 'components/Threads';
import 'styles/main.scss';
import {bindActionCreators} from 'redux';
import * as actionsMessages from 'actions/messages.js';


startSocketClient();

@connect(state => ({ messages: state.messages }))
class Application extends React.Component {

  static propTypes = {
    // TODO: add good validation
    messages: PropTypes.array.isRequired,
    newMessage: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }


  render() {
    const {messages} = this.props;
    const actions = bindActionCreators(actionsMessages, this.props.dispatch);

    return (
      <div className="chat-page">
        <Header />
        <Threads />
        <Messages messages={messages} {...actions} />
      </div>
    );
  }
}

export default Application;
