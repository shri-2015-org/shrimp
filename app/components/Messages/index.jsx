import React, {PropTypes} from 'react';
import MessageList from 'components/MessageList';
import MessageComposer from 'components/MessageComposer';
import './styles.scss';


export default class Messages extends React.Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    newMessage: PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      listPaddingBottom: 0,
      userId: null,
      userName: null,
    };
  }


  componentDidMount = () => {
    const list = this.refs.list.getDOMNode();
    this.basePaddingBottom = parseInt(window.getComputedStyle(list).paddingBottom, 10);
    this.baseTextareaHeight = null;
  }


  setUser = (name, id) => {
    this.setState({
      userId: id,
      userName: name,
    });
  }


  scrollToBottom = () => {
    const list = this.refs.list.getDOMNode();
    window.scrollTo(0, list.scrollHeight);
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
    const {messages, newMessage, users} = this.props;
    return (
      <div
        className='messages'
        ref='list'
        style={{paddingBottom: this.state.listPaddingBottom}}
      >
        <MessageList
          messages={messages}
          scroll={this.scrollToBottom}
          userId={this.state.userId}
          userName={this.state.userName}
          users={users}
        />
        <MessageComposer
          newMessage={newMessage}
          changePaddingBottom={this.changePaddingBottom}
          setUser={this.setUser}
          userId={this.state.userId}
          userName={this.state.userName}
          users={users}
        />
      </div>
    );
  }
}
