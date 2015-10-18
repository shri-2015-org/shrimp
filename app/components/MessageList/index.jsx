import React, {PropTypes} from 'react';
import Immutable, {List, Map} from 'immutable';
import Message from 'components/Message';
import './styles.scss';


export default class MessageList extends React.Component {

  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    scroll: PropTypes.func.isRequired,
    sendEditedMessage: PropTypes.func.isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
  }


  shouldComponentUpdate(nextProps) {
    return !(
      Immutable.is(nextProps.messages, this.props.messages) &&
      Immutable.is(nextProps.local, this.props.local)
    );
  }


  componentDidUpdate() {
    this.props.scroll();
  }

  render() {
    const {local, sendEditedMessage} = this.props;

    let prevId = null;
    const messages = this.props.messages
      .map((message, i, arr) => {
        const sender = message.get('sender');
        const id = sender.get('id');
        const senderRepeated = id === prevId;
        prevId = id;
        const nextMessage = arr.get(i + 1);
        const nextMessageIsMain = (() => {
          if (!nextMessage) return false;
          return id === nextMessage.get('sender').get('id');
        }());
        return (
          <Message
            key={i}
            sender={sender}
            senderRepeated={senderRepeated}
            nextMessageIsMain={nextMessageIsMain}
            text={message.get('text')}
            currentUserId={local.get('userId')}
            messageId={message.get('id')}
            timestamp={message.get('timestamp')}
            sendEditedMessage={sendEditedMessage}
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
