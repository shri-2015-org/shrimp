import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import {startSocketClient} from 'core/socket';
import Messages from 'components/Messages';
import Header from 'components/Header';
import Threads from 'components/Threads';
import 'styles/main.scss';
import {bindActionCreators} from 'redux';
import * as actionsMessages from 'actions/messages.js';
import * as actionsLocal from 'actions/local.js';
import {currentChannelMessagesSelector} from 'selectors/messagesSelector';
import Sidebar from 'react-sidebar';


startSocketClient();

@connect(state => ({
  messages: currentChannelMessagesSelector(state),
  channels: state.channels,
  users: state.users,
  local: state.local,
}))
export default class Application extends React.Component {
  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    channels: PropTypes.instanceOf(List).isRequired,
    users: PropTypes.instanceOf(List).isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
    dispatch: PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      sidebarDocked: true,
    };
  }


  componentWillMount = () => {
    const mql = window.matchMedia('(min-width: 800px)');
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, docked: mql.matches});
  }


  componentWillUnmount = () => {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }


  onSetSidebarOpen = (open) => {
    this.setState({sidebarOpen: open});
  }


  mediaQueryChanged = () => {
    this.setState({sidebarDocked: this.state.mql.matches});
  }


  render() {
    const {messages, channels, users, local, dispatch} = this.props;
    const actionsCombine = Object.assign(actionsMessages, actionsLocal);
    const actions = bindActionCreators(actionsCombine, dispatch);
    const threads = <Threads channels={channels} users={users} local={local} {...actions}/>;
    return (
      <div className='chat-page'>
        <Header
          setOpen={this.onSetSidebarOpen}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          />
        <Sidebar
          sidebar={threads}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          docked={this.state.sidebarDocked}
        >
          <Messages
            docked={this.state.sidebarDocked}
            messages={messages}
            local={local}
            {...actions}
          />
        </Sidebar>
      </div>
    );
  }
}
