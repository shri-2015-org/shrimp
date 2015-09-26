import React, {PropTypes} from 'react';
import Message from 'components/Message';
import './styles.scss';

export default class MessageList extends React.Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    scroll: PropTypes.func.isRequired,
    local: PropTypes.object.isRequired,
  }


  shouldComponentUpdate(nextProps) {
    return  nextProps.messages !== this.props.messages ||
            nextProps.local !== this.props.local;
  }


  componentDidUpdate() {
    this.props.scroll();
  }

  render() {
    const {local} = this.props;
    const messages = this.props.messages.map((message, i) => {
      return (
        <Message
          key={i}
          sender={message.get('sender')}
          text={message.get('text')}
          currentUserId={local.get('userId')}
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
