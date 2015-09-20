import React, {PropTypes} from 'react';
import MessageList from 'components/MessageList';
import MessageComposer from 'components/MessageComposer';
import './styles.scss';


export default class Messages extends React.Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    newMessage: PropTypes.func.isRequired,
  }


  componentDidMount = () => {
    const list = this.refs.list.getDOMNode();
    this.basePaddingBottom = parseInt(window.getComputedStyle(list).paddingBottom, 10);
    this.baseTextareaHeight = null;
  }


  scrollToBottom = () => {
    const list = this.refs.list.getDOMNode();
    window.scrollTo(0, list.scrollHeight);
  }


  changePaddingBottom = (height) => {
    if (this.baseTextareaHeight === null) {
      this.baseTextareaHeight = height;
    }
    const list = this.refs.list.getDOMNode();
    list.style.paddingBottom = this.basePaddingBottom - this.baseTextareaHeight + height + 'px';
    this.scrollToBottom();
  }


  render() {
    const {messages, newMessage} = this.props;
    return (
      <div className='messages' ref='list'>
        <MessageList
          messages={messages}
          scroll={this.scrollToBottom}
          />
        <MessageComposer
          newMessage={newMessage}
          changePaddingBottom={this.changePaddingBottom}
          />
      </div>
    );
  }
}
