import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import cookies from 'browser-cookies';
import Sidebar from 'react-sidebar';
import store from 'store';
import {socketClient} from 'core/socket';
import {bindActionCreators} from 'redux';
import DocumentTitle from 'react-document-title';

import {messageFilterSelector, pinnedMessagesSelector} from 'selectors/messagesSelector';
import {contactsSelector} from 'selectors/contactsSelector';
import {localSelector} from 'selectors/localSelector';
import {indirectChannelsSelector} from 'selectors/channelsSelector';
import {directChannelsSelector} from 'selectors/directChannelsSelector';
import {currentChannelSelector} from 'selectors/currentChannelSelector';
import {joinedUsersSelector} from 'selectors/joinedUsersSelector';

import * as actionsChannels from 'actions/channels';
import * as actionsMessages from 'actions/messages';
import * as actionsLocal from 'actions/local';

import Messages from 'components/Messages';
import Header from 'components/Header';
import Threads from 'components/Threads';
import ChannelInfo from 'components/ChannelInfo';
import ChannelHeader from 'components/ChannelHeader';

import 'styles/main.scss';

@connect(state => ({
  messages: messageFilterSelector(state),
  channels: state.channels,
  users: state.users,
  local: localSelector(state),
  contacts: contactsSelector(state),
  indirectChannels: indirectChannelsSelector(state),
  directChannels: directChannelsSelector(state),
  pinnedMessages: pinnedMessagesSelector(state),
  currentChannel: currentChannelSelector(state),
  joinedUsers: joinedUsersSelector(state),
}))
export default class Application extends React.Component {
  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    pinnedMessages: PropTypes.instanceOf(List).isRequired,
    channels: PropTypes.instanceOf(List).isRequired,
    users: PropTypes.instanceOf(List).isRequired,
    contacts: PropTypes.instanceOf(List).isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node,
    indirectChannels: PropTypes.instanceOf(List).isRequired,
    directChannels: PropTypes.instanceOf(List).isRequired,
    currentChannel: PropTypes.instanceOf(Map).isRequired,
    joinedUsers: PropTypes.instanceOf(List).isRequired,
  }


  constructor(props) {
    super(props);
    this.actionsCombine = Object.assign(actionsMessages, actionsLocal, actionsChannels);
    this.actions = bindActionCreators(this.actionsCombine, props.dispatch);
    this.state = {
      sidebarOpen: false,
      sidebarDocked: true,
      informSidebarOpen: false,
      informSidebarDocked: true,
      currentTabId: 1,
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


  getDirectChannelByUserId = (userId) => {
    return this.props.directChannels
      .find(c => c.get('users') && c.get('users').find(u => u._id === userId || (u.get && u.get('_id') === userId)));
  }

  setCurrentDirectChannel = (userId) => {
    const directChannel = this.getDirectChannelByUserId(userId);
    if (!directChannel) {
      const channelId = [this.props.local.get('userId'), userId].sort().join('');
      this.actions.addDirectChannel({
        userIds: [this.props.local.get('userId'), userId],
        name: channelId,
      });
      this.actions.addDirtyDirectChannel(channelId);
      return;
    }
    this.actions.changeCurrentChannel(directChannel.get('id'));
    this.changeTab(1);
  }

  mediaQueryChanged = () => {
    this.setState({sidebarDocked: this.state.mql.matches, sidebarOpen: this.state.mql.matches});
  }

  changeToDirectChannel = (contactId) => {
    this.setCurrentDirectChannel(contactId);
    this.actions.markChannelAsRead({ channelId: this.props.local.get('currentChannelId'), lastSeen: new Date().toUTCString() });
    if (this.getDirectChannelByUserId(contactId)) {
      this.actions.markChannelAsRead({ channelId: this.getDirectChannelByUserId(contactId).get('id'), lastSeen: new Date().toUTCString() });
    }
  }

  changeTab = (tabId) => {
    this.setState({
      currentTabId: tabId,
    });
  };

  render() {
    const threads = (
      <Threads
        {...this.props}
        getDirectChannelByUserId={this.getDirectChannelByUserId}
        changeToDirectChannel={this.changeToDirectChannel}
        changeTab={this.changeTab}
        currentTabId={this.state.currentTabId}
        {...this.actions}
      />
    );

    return (
      <DocumentTitle title='Chat' >
        <div className='chat-page'>
          {this.props.children}
          <Header
            {...this.props}
            setOpen={this.onSetSidebarOpen}
            open={this.state.sidebarOpen}
            docked={this.state.sidebarDocked}
            {...this.actions}
          />
          <Sidebar
            {...this.props}
            sidebar={threads}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            docked={this.state.sidebarDocked}
            shadow={false}
          >
            <ChannelHeader
              {...this.props}
            />
            <Sidebar
              sidebar={
                <ChannelInfo
                  {...this.props}
                  unpinMessage={this.actions.unpinMessage}
                  changeToDirectChannel={this.changeToDirectChannel}
                />
              }
              open={this.state.informSidebarOpen}
              onSetOpen={this.onSetSidebarOpen}
              docked={this.state.informSidebarDocked}
              shadow={false}
              pullRight
            >
              <Messages
                {...this.props}
                docked={this.state.sidebarDocked}
                setCurrentDirectChannel={this.setCurrentDirectChannel}
                {...this.actions}
              />

            </Sidebar>
          </Sidebar>
        </div>
      </DocumentTitle>
    );
  }
}
