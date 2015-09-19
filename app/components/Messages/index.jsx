import React, {PropTypes} from 'react';
import MessageList from 'components/MessageList';
import MessageComposer from 'components/MessageComposer';
import './styles.scss';


export default class Messages extends React.Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    newMessage: PropTypes.func.isRequired,
  }

  messagesScrollToBottom = () => {
    const list = this.refs.list.getDOMNode();
    window.scrollTo(0, list.scrollHeight);
  }

  render() {
    const {messages, newMessage} = this.props;
    return (
      <div className='messages' ref='list'>
        <MessageList messages={messages} scroll={this.messagesScrollToBottom} />
        <MessageComposer newMessage={newMessage}/>
      </div>
    );
  }
}
