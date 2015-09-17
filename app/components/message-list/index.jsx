import React, {PropTypes} from 'react';
import MessageItem from 'components/message-item';

export default class MessageList extends React.Component {

  static propTypes = {
    messages: PropTypes.arrayOf(React.PropTypes.object),
  }

  render() {
    const messages = this.props.messages.map((message, i) => {
      return (
        <MessageItem
          key={i}
          user={message.get('senderId')}
          text={message.get('text')}
        />
      );
    });

    return (
      <ul>
        {messages}
      </ul>
    );
  }
}
