import React, {PropTypes} from 'react';
import MessageSection from './components/MessageSection';
import {connect} from 'react-redux';
import {startSocketClient} from './core/socket';


startSocketClient();

@connect(state => ({ messages: state.messages }))
class Application extends React.Component {

  static propTypes = {
    // TODO: add good validation
    messages: PropTypes.array,
  }

  render() {
    const {messages} = this.props;
    return (
      <div>
        <MessageSection messages={messages} />
      </div>
    );
  }
}

export default Application;
