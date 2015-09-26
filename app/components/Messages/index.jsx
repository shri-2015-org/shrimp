import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import MessageList from 'components/MessageList';
import MessageComposer from 'components/MessageComposer';
import './styles.scss';


export default class Messages extends React.Component {

  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
    newMessage: PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      listPaddingBottom: 0,
    };
  }


  componentDidMount = () => {
    const list = this.refs.list.getDOMNode();
    this.basePaddingBottom = parseInt(window.getComputedStyle(list).paddingBottom, 10);
    this.baseTextareaHeight = null;
  }

  shouldComponentUpdate(nextProps) {
    return  nextProps.messages !== this.props.messages ||
            nextProps.local !== this.props.local;
  }

  scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  }


  changePaddingBottom = (height) => {
    if (this.baseTextareaHeight === null) {
      this.baseTextareaHeight = height;
    }
    this.setState({
      listPaddingBottom: this.basePaddingBottom - this.baseTextareaHeight + height,
    });
    this.scrollToBottom();
  }


  render() {
    const {messages, local, newMessage} = this.props;
    return (
      <div
        className='messages'
        ref='list'
        style={{paddingBottom: this.state.listPaddingBottom}}
      >
        <MessageList
          messages={messages}
          scroll={this.scrollToBottom}
          local={local}
        />
        <MessageComposer
          local={local}
          newMessage={newMessage}
          changePaddingBottom={this.changePaddingBottom}
        />
      </div>
    );
  }
}
