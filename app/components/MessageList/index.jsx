import React, {PropTypes} from 'react';
import Immutable, {List, Map} from 'immutable';
import Message from 'components/Message';
import './styles.scss';


export default class MessageList extends React.Component {

  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    scroll: PropTypes.func.isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
  }


  shouldComponentUpdate(nextProps) {
    return  !(
      Immutable.is(nextProps.messages, this.props.messages) &&
      Immutable.is(nextProps.local, this.props.local)
    );
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
          timestamp={message.get('timestamp')}
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
