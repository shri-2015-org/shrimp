import React, {PropTypes} from 'react';
import Immutable, {List, Map} from 'immutable';
import GeminiScrollbar from 'react-gemini-scrollbar';

import Tabs from 'components/Tabs';
import Tab from 'components/Tab';
import ThreadsList from 'components/ThreadsList';
import Search from 'components/Search';
import UnreadCounter from 'components/UnreadCounter';

import './styles.scss';

export default class Threads extends React.Component {
  static propTypes = {
    channels: PropTypes.instanceOf(List).isRequired,
    contacts: PropTypes.instanceOf(List).isRequired,
    changeCurrentChannel: PropTypes.func.isRequired,
    markChannelAsRead: PropTypes.func.isRequired,
    addDirtyChannel: PropTypes.func.isRequired,
    removeDirtyChannel: PropTypes.func.isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
    indirectChannels: PropTypes.instanceOf(List).isRequired,
    directChannels: PropTypes.instanceOf(List).isRequired,
    addDirectChannel: PropTypes.func.isRequired,
    addDirtyDirectChannel: PropTypes.func.isRequired,
    removeDirtyDirectChannel: PropTypes.func.isRequired,
    getDirectChannelByUserId: PropTypes.func.isRequired,
    changeToDirectChannel: PropTypes.func.isRequired,
    changeTab: PropTypes.func.isRequired,
    currentTabId: PropTypes.number.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
    };
  }


  componentDidMount = () => {
    const threadsWrapper = this.refs.threads.parentNode;
    threadsWrapper.style.overflowX = 'hidden';
    window.addEventListener('keydown', this.removeDirtyChannel);
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.directChannels.size > this.props.directChannels.size) {
      const addedChannel = nextProps.directChannels.last();
      const addedChannelName = addedChannel.get('name');
      this.props.markChannelAsRead({channelId: addedChannel.get('id'), lastSeen: new Date().toUTCString()});
      if (this.props.currentTabId === 1) {
        const dirtyChannel = this.props.channels.find(
            c => c.get('isDirty') && c.get('isDirect') && c.get('dirtyName') === addedChannelName);

        if (dirtyChannel) {
          this.props.removeDirtyDirectChannel();
          this.props.changeCurrentChannel(addedChannel.get('id'));
        }
      }
    }

    return !(
      Immutable.is(nextProps.indirectChannels, this.props.indirectChannels) &&
      Immutable.is(nextProps.directChannels, this.props.directChannels) &&
      Immutable.is(nextProps.contacts, this.props.contacts) &&
      Immutable.is(nextProps.local, this.props.local) &&
      nextProps.currentTabId === this.props.currentTabId &&
      Immutable.is(nextState.filterValue, this.state.filterValue)
    );
  };


  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.removeDirtyChannel);
  };


  addDirtyChannel = () => {
    const threadsWrapper = this.refs.threads.parentNode;
    threadsWrapper.scrollTop = 0;
    this.props.addDirtyChannel();
  };

  isCurrentDirectChannel = (userId) => {
    const directChannel = this.props.getDirectChannelByUserId(userId);
    return directChannel && this.props.local.get('currentChannelId') === directChannel.get('id');
  }


  removeDirtyChannel = (e) => {
    if (e.keyCode === 27) {
      this.props.removeDirtyChannel();
    }
  };


  changeFilterValue = (e) => {
    this.setState({
      filterValue: e.target.value,
    });
  };


  render() {
    const {
      indirectChannels,
      contacts,
    } = this.props;

    const tabs = List.of(
      Map({id: 1, name: 'People', sendToServer: false, list: contacts }),
      Map({id: 2, name: 'Channels', sendToServer: false, list: indirectChannels }),
    );

    const currentTabData = tabs.find(tab => tab.get('id') === this.props.currentTabId);

    let filterData = currentTabData.get('list').filter(listItem => {
      return listItem.get('isDirty') || listItem.get('name').indexOf(this.state.filterValue) !== -1;
    });

    if (currentTabData.get('name') === 'Channels') {
      filterData = filterData.sort((a, b) => {
        if (a.get('isFavorite') && !b.get('isFavorite')) {
          return -1;
        }
        if (!a.get('isFavorite') && b.get('isFavorite')) {
          return 1;
        }
        return 0;
      });
    }

    const isUnreadChannel = c => c.get('id') !== this.props.local.get('currentChannelId') && c.get('unreadCount') > 0;

    const unreadDirectChannelsCount = this.props.directChannels.count(isUnreadChannel);
    const unreadIndirectChannelsCount = this.props.indirectChannels.count(isUnreadChannel);

    return (
      <div className='threads' ref='threads'>
        <Tabs
          currentTabId={this.props.currentTabId}
          changeTab={this.props.changeTab}
          className='threads__tabs'
        >
          <Tab id={1} className='threads__tab'>People
            <UnreadCounter
              className='threads__tabs__unread-counter'
              count={unreadDirectChannelsCount === 0 ? null : unreadDirectChannelsCount}
            />
          </Tab>
          <Tab id={2} className='threads__tab'>Channels
            <UnreadCounter
              className='threads__tabs__unread-counter'
              count={unreadIndirectChannelsCount === 0 ? null : unreadIndirectChannelsCount}
            />
          </Tab>
        </Tabs>

        <GeminiScrollbar className='gm-scrollbar-container '>
          <ThreadsList
            {...this.props}
            list={filterData}
            type={currentTabData.get('name')}
            isCurrentDirectChannel={this.isCurrentDirectChannel}
          />
        </GeminiScrollbar>
        <div className='treads-bottom'>
          <Search
            onChange={this.changeFilterValue}
            className='threads__search'
            inputClassName='threads__search__input'
            iconClassName='threads__search__icon'
          />
          <button
            onClick={this.addDirtyChannel}
            className='add-channel-button'
          ></button>
        </div>
      </div>
    );
  }
}
