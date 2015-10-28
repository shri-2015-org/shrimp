import React, {PropTypes} from 'react';
import Immutable, {List, Map} from 'immutable';
import MessageList from 'components/MessageList';
import MessageComposer from 'components/MessageComposer';
import './styles.scss';


export default class Messages extends React.Component {

  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
    currentChannel: PropTypes.instanceOf(Map),
    docked: PropTypes.bool.isRequired,
    language: PropTypes.string.isRequired,
    loadChannelHistory: PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      listBottom: 0,
      previousScrollHeight: 0,
    };
  }


  componentDidMount = () => {
    this.baseTextareaHeight = null;
    this.attachScrollListener();
  }


  componentWillReceiveProps = nextProps => {
    this.loadMoreHistory(nextProps.currentChannel);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      Immutable.is(nextProps.messages, this.props.messages) &&
      Immutable.is(nextProps.local, this.props.local) &&
      nextProps.docked === this.props.docked &&
      nextProps.language === this.props.language &&
      nextState.listBottom === this.state.listBottom &&
      nextState.previousScrollHeight === this.state.previousScrollHeight
    );
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  scrollListener = () => {
    const list = this.refs.list;
    if (list.scrollTop === 0) {
      this.loadMoreHistory(this.props.currentChannel);
      this.skipNextScroll = true;
    }
  }
  loadMoreHistory = (currentChannel) => {
    const list = this.refs.list;
    this.setState({
      previousScrollHeight: list.scrollHeight,
    });
    if (
      currentChannel &&
      currentChannel.get('loadingStatus') !== 'END' &&
      currentChannel.get('loadingStatus') !== 'LOADING' &&
      (
        !currentChannel.get('loadingStatus') ||
        list.scrollTop === 0
      )
    ) {
      this.props.loadChannelHistory({channelId: currentChannel.get('id'), baseDate: currentChannel.get('loadingStatus')});
    }
  }
  attachScrollListener = () => {
    const list = this.refs.list;
    list.addEventListener('scroll', this.scrollListener);
    this.scrollListener();
  }
  detachScrollListener = () => {
    const list = this.refs.list;
    list.removeEventListener('scroll', this.scrollListener);
  }


  scrollToBottom = () => {
    const list = this.refs.list;
    if (this.skipNextScroll) {
      this.skipNextScroll = false;
      list.scrollTop = list.scrollHeight - this.state.previousScrollHeight;
    } else {
      list.scrollTop = list.scrollHeight;
    }
  }


  changeBottom = (height) => {
    if (this.baseTextareaHeight === null) {
      this.baseTextareaHeight = height;
    }
    this.setState({
      listBottom: height - this.baseTextareaHeight,
    });
    this.scrollToBottom();
  }


  render() {
    const {messages, local} = this.props;
    return (
      <div
        className='messages'
        ref='list'
        style={{bottom: this.state.listBottom}}
      >
        <MessageList
          messages={messages}
          scroll={this.scrollToBottom}
          local={local}
          language={this.props.language}
        />
        <MessageComposer
          {...this.props}
          local={local}
          changeBottom={this.changeBottom}
        />
      </div>
    );
  }
}
