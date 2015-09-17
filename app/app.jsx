import React, {PropTypes} from 'react';
import MessageList from './components/message-list';
import MessageBox from './components/message-box';
import {connect} from 'react-redux';
import {startSocketClient} from './core/socket';


startSocketClient();

@connect(state => ({ messages: state.messages }))
export default class Application extends React.Component {

  static propTypes = {
    // TODO: add good validation
    messages: PropTypes.array,
  }

  render() {
    const {messages} = this.props;
    return (
      <div>
        <MessageList messages={messages} />
        <MessageBox />
      </div>
    );
  }
}
