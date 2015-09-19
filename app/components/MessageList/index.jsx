import React, {PropTypes} from 'react';
import Message from 'components/Message';
import './styles.scss';

export default class MessageList extends React.Component {

  static propTypes = {
    messages: PropTypes.arrayOf(React.PropTypes.object),
  }

  componentWillUpdate() {
    const list = this.refs.list.getDOMNode();
    this.shouldScrollBottom = list.scrollTop + list.offsetHeight === list.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      const list = this.refs.list.getDOMNode();
      list.scrollTop = list.scrollHeight;
    }
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
      <div className='messages-list'>
        <ul className='messages-list__list' ref='list'>
          {messages}
        </ul>
      </div>
    );
  }
}
