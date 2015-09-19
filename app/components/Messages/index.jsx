import React, {PropTypes} from 'react';
import MessageList from 'components/MessageList';
import MessageComposer from 'components/MessageComposer';
import './styles.scss';


export default class Messages extends React.Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    newMessage: PropTypes.func.isRequired,
  }

  render() {
    const {messages, newMessage} = this.props;
    return (
      <div className='messages'>
        <MessageList messages={messages}/>
        <MessageComposer newMessage={newMessage}/>
      </div>
    );
  }
}
