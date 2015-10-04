import React, {PropTypes} from 'react';
import Immutable, {List, Map} from 'immutable';
import MessageList from 'components/MessageList';
import MessageComposer from 'components/MessageComposer';
import ScrollAria from 'react-scrollbar';
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
      listBottom: 0,
    };
  }


  componentDidMount = () => {
    this.baseTextareaHeight = null;
    this.messagesNode = document.querySelector('.messages');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      Immutable.is(nextProps.messages, this.props.messages) &&
      Immutable.is(nextProps.local, this.props.local) &&
        nextProps.docked === this.props.docked &&
        nextState.listBottom === this.state.listBottom
    );
  }

  scrollToBottom = () => {
    this.messagesNode.scrollTop = 999999;
  }


  changeBottom = height => {
    if (this.baseTextareaHeight === null) {
      this.baseTextareaHeight = height;
    }
    this.setState({
      listBottom: height - this.baseTextareaHeight,
    });
    this.scrollToBottom();
  }


  render() {
    const {messages, local, newMessage} = this.props;
    return (
      <div>
        <ScrollAria
          className='messages'
          contentStyle={{bottom: this.state.listBottom}}
        >
          <MessageList
            messages={messages}
            scroll={this.scrollToBottom}
            local={local}
          />
        </ScrollAria>
        <MessageComposer
          local={local}
          newMessage={newMessage}
          changeBottom={this.changeBottom}
        />
      </div>
    );
  }
}
