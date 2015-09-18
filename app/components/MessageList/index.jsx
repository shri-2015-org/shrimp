import React, {PropTypes} from 'react';
import Message from 'components/Message';
import './styles.scss';

export default class MessageList extends React.Component {

  static propTypes = {
    messages: PropTypes.arrayOf(React.PropTypes.object),
  }

  render() {
    const messages = this.props.messages.map((message, i) => {
      return (
        <Message
          key={i}
          user={message.get('senderId')}
          text={message.get('text')}
        />
      );
    });

    return (
      <ul className='messages-list'>
        {messages}
      </ul>
    );
  }
}
