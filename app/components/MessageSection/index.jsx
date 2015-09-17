import React, {PropTypes} from 'react';
import MessageList from 'components/MessageList';
import MessageComposer from 'components/MessageComposer';


export default class MessageSection extends React.Component {
  static propTypes = {
    messages: PropTypes.array,
  }

  render() {
    const {messages} = this.props;
    return (
      <div>
        <MessageList messages={messages}/>
        <MessageComposer />
      </div>
    );
  }
}
