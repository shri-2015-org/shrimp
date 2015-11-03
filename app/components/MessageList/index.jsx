import React, {PropTypes} from 'react';
import Immutable, {List, Map} from 'immutable';

import Message from 'components/Message';

import './styles.scss';


export default class MessageList extends React.Component {

  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    scroll: PropTypes.func.isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
    pinMessage: PropTypes.func.isRequired,
    unpinMessage: PropTypes.func.isRequired,
    setCurrentDirectChannel: PropTypes.func.isRequired,
    currentChannel: PropTypes.instanceOf(Map).isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      prevChannelName: 0,
      prevMessageId: 0,

    };
  }


  shouldComponentUpdate(nextProps) {
    this.state.prevChannelName = this.props.currentChannel.get('name');
    const lastMessage = this.props.messages.last();
    if (lastMessage) {
      this.state.prevMessageId = lastMessage.get('id');
    }
    return !(
      Immutable.is(nextProps.messages, this.props.messages) &&
      Immutable.is(nextProps.local, this.props.local)
    );
  }


  componentDidUpdate() {
    this.props.scroll();
  }

  render() {
    const {local} = this.props;

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
            {...this.props}
            message={message}
            pinMessage={this.props.pinMessage}
            unpinMessage={this.props.unpinMessage}
            key={i}
            senderRepeated={senderRepeated}
            nextMessageIsMain={nextMessageIsMain}
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
