import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import cookies from 'browser-cookies';
import Sidebar from 'react-sidebar';
import store from 'store';
import {socketClient} from 'core/socket';
import Messages from 'components/Messages';
import Header from 'components/Header';
import Threads from 'components/Threads';
import 'styles/main.scss';
import {bindActionCreators} from 'redux';
import * as actionsMessages from 'actions/messages.js';
import * as actionsLocal from 'actions/local.js';
import {currentChannelMessagesSelector} from 'selectors/messagesSelector';
import {contactsSelector} from 'selectors/contactsSelector';
import DocumentTitle from 'react-document-title';

@connect(state => ({
  messages: currentChannelMessagesSelector(state),
  channels: state.channels,
  users: state.users,
  local: state.local,
  contacts: contactsSelector(state),
}))
export default class Application extends React.Component {
  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    channels: PropTypes.instanceOf(List).isRequired,
    users: PropTypes.instanceOf(List).isRequired,
    contacts: PropTypes.instanceOf(List).isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
    dispatch: PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      sidebarDocked: true,
      messagesFilterValue: '',
    };
  }


  componentWillMount = () => {
    const cookieSessionId = cookies.get('sessionId');
    if (!cookieSessionId) {
      store.history.pushState(null, '/login');
    } else {
      socketClient('SOCKET_INIT');
      store.dispatch(actionsLocal.getInitData());
    }

    const mql = window.matchMedia('(min-width: 800px)');
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches, sidebarOpen: mql.matches});
  }


  componentWillUnmount = () => {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }


  onSetSidebarOpen = (open) => {
    this.setState({sidebarOpen: open});
  }


  mediaQueryChanged = () => {
    this.setState({sidebarDocked: this.state.mql.matches, sidebarOpen: this.state.mql.matches});
  }


  changeFilter = (e) => {
    this.setState({
      messagesFilterValue: e.target.value.toLowerCase(),
    });
  }


  render() {
    const {messages, channels, local, dispatch, contacts} = this.props;
    const actionsCombine = Object.assign(actionsMessages, actionsLocal);
    const actions = bindActionCreators(actionsCombine, dispatch);
    const threads = (
      <Threads
        channels={channels}
        contacts={contacts}
        local={local}
        {...actions}
      />
    );

    return (
      <DocumentTitle title='Chat' >
        <div className='chat-page'>
          <Header
            setOpen={this.onSetSidebarOpen}
            open={this.state.sidebarOpen}
            docked={this.state.sidebarDocked}
            changeFilter={this.changeFilter}
            {...actions}
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
              messagesFilterValue={this.state.messagesFilterValue}
              {...actions}
            />
          </Sidebar>
        </div>
      </DocumentTitle>
    );
  }
}
