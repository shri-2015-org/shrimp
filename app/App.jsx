import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import cookies from 'browser-cookies';
import Sidebar from 'react-sidebar';
import puttext from 'puttext';
import store from 'store';
import {socketClient} from 'core/socket';
import Messages from 'components/Messages';
import Header from 'components/Header';
import Threads from 'components/Threads';
import 'styles/main.scss';
import {bindActionCreators} from 'redux';
import * as actionsChannels from 'actions/channels';
import * as actionsMessages from 'actions/messages';
import * as actionsLocal from 'actions/local';
import {messageFilterSelector} from 'selectors/messagesSelector';
import {contactsSelector} from 'selectors/contactsSelector';
import i18nMessages from 'i18n/index';
import DocumentTitle from 'react-document-title';
import {localSelector} from 'selectors/localSelector';
import {indirectChannelsSelector, currentChannelsSelector} from 'selectors/channelsSelector';
import {directChannelsSelector} from 'selectors/directChannelsSelector';

@connect(state => ({
  messages: messageFilterSelector(state),
  channels: state.channels,
  currentChannel: currentChannelsSelector(state),
  users: state.users,
  local: localSelector(state),
  contacts: contactsSelector(state),
  indirectChannels: indirectChannelsSelector(state),
  directChannels: directChannelsSelector(state),
}))
export default class Application extends React.Component {
  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    channels: PropTypes.instanceOf(List).isRequired,
    users: PropTypes.instanceOf(List).isRequired,
    contacts: PropTypes.instanceOf(List).isRequired,
    currentChannel: PropTypes.instanceOf(Map),
    local: PropTypes.instanceOf(Map).isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node,
    indirectChannels: PropTypes.instanceOf(List).isRequired,
    directChannels: PropTypes.instanceOf(List).isRequired,
  }
  static childContextTypes = {
    __: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      sidebarDocked: true,
    };
  }

  getChildContext() {
    return {
      __: puttext(i18nMessages[this.props.local.get('language')]),
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


  render() {
    const {messages, channels, local, dispatch, contacts, indirectChannels, directChannels} = this.props;
    const actionsCombine = Object.assign(actionsMessages, actionsLocal, actionsChannels);
    const actions = bindActionCreators(actionsCombine, dispatch);
    const threads = (
      <Threads
        channels={channels}
        contacts={contacts}
        local={local}
        indirectChannels={indirectChannels}
        directChannels={directChannels}
        {...actions}
      />
    );

    return (
      <DocumentTitle title='Chat' >
        <div className='chat-page'>
          {this.props.children}
          <Header
            setOpen={this.onSetSidebarOpen}
            open={this.state.sidebarOpen}
            docked={this.state.sidebarDocked}
            local={local}
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
              currentChannel={this.props.currentChannel}
              local={local}
              language={this.props.local.get('language') ? this.props.local.get('language') : 'en' }
              {...actions}
            />
          </Sidebar>
        </div>
      </DocumentTitle>
    );
  }
}
