import React, {PropTypes} from 'react';
import Message from 'components/Message';
import './styles.scss';

export default class MessageList extends React.Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    scroll: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    userId: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
  }


  componentDidUpdate() {
    this.props.scroll();
  }

  render() {
    const {userId, userName, users} = this.props;
    const messages = this.props.messages.map((message, i) => {
      return (
        <Message
          key={i}
          senderId={message.senderId}
          text={message.text}
          userId={userId}
          userName={userName}
          users={users}
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
