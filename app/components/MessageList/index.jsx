import React, {PropTypes} from 'react';
import Message from 'components/Message';
import './styles.scss';

export default class MessageList extends React.Component {

  static propTypes = {
    messages: PropTypes.arrayOf(React.PropTypes.object),
    scroll: PropTypes.func.isRequired,
  }


  componentDidUpdate() {
    this.props.scroll();
  }

  render() {
    const messages = this.props.messages.map((message, i) => {
      return (
        <Message
          key={i}
          user={message.senderId}
          text={message.text}
          />
      );
    });

    return (
      <div className='messages-list'>
        <ul className='messages-list__list'>
          {messages}
        </ul>
      </div>
    );
  }
}
