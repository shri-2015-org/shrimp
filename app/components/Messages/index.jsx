import React, {PropTypes} from 'react';
import Immutable, {List, Map} from 'immutable';
import MessageList from 'components/MessageList';
import MessageComposer from 'components/MessageComposer';
import './styles.scss';


export default class Messages extends React.Component {

  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
    newMessage: PropTypes.func.isRequired,
    docked: PropTypes.bool.isRequired,
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

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      Immutable.is(nextProps.messages, this.props.messages) &&
      Immutable.is(nextProps.local, this.props.local) &&
        nextProps.docked === this.props.docked &&
        nextState.listPaddingBottom === this.state.listPaddingBottom
    );
  }

  scrollToBottom = () => {
    const listWrapper = this.refs.list.getDOMNode().parentElement;
    setTimeout(() => listWrapper.scrollTop = listWrapper.scrollHeight, 0);
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
    const {messages, local, newMessage, docked} = this.props;
    return (
      <div
        className='messages'
        ref='list'
        style={{bottom: this.state.listPaddingBottom}}
      >
        <MessageList
          messages={messages}
          scroll={this.scrollToBottom}
          local={local}
        />
        <MessageComposer
          docked={docked}
          local={local}
          newMessage={newMessage}
          changePaddingBottom={this.changePaddingBottom}
        />
      </div>
    );
  }
}
