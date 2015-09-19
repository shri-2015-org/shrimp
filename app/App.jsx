import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {startSocketClient} from 'core/socket';
import Messages from 'components/Messages';
import Header from 'components/Header';
import Threads from 'components/Threads';
import 'styles/main.scss';


startSocketClient();

@connect(state => ({ messages: state.messages }))
class Application extends React.Component {

  static propTypes = {
    // TODO: add good validation
    messages: PropTypes.array,
    newMessage: PropTypes.func.isRequired,
  }


  render() {
    const {messages, newMessage} = this.props;
    return (
      <div>
        <Header />
        <Threads />
        <Messages messages={messages} newMessage={newMessage} />
      </div>
    );
  }
}

export default Application;
