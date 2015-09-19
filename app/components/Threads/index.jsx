import React from 'react';
import './styles.scss';
import ThreadsHeader from 'components/ThreadsHeader';
import ThreadsList from 'components/ThreadsList';

const peopleTab = { id: 0, name: 'People' };
const channelsTab = { id: 1, name: 'Channels' };

const tabs = [
  peopleTab,
  channelsTab,
];

const activeChannelId = 1;

const channelsList = [
  {
    id: 1,
    name: 'general',
    isFavourite: false,
    unreadMessagesCount: 20,
  },
  {
    id: 2,
    name: 'flud',
    isFavourite: true,
    unreadMessagesCount: 20,
  },
  {
    id: 3,
    name: 'other',
    isFavourite: true,
    unreadMessagesCount: 0,
  },
  {
    id: 4,
    name: 'very long ',
    isFavourite: true,
    unreadMessagesCount: 0,
  },
];

const peopleList = [
  {
    id: 1,
    nick: 'nick1',
    name: 'Vasya',
    avatar: 'image.jpg',
    isOnline: false,
  },
  {
    id: 2,
    nick: 'nick2',
    name: 'Vasya',
    avatar: 'image.jpg',
    isOnline: true,
  },
];

export default class ThreadsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: peopleTab.id,

    };
  }
  changeTab = (tab) => {
    this.setState({ currentTab: tab.id });
  };

  render() {
    return (
      <div className='threads'>
        <ThreadsHeader tabs={tabs} changeTab={this.changeTab} currentTab={this.state.currentTab} />
        {this.state.currentTab === peopleTab.id
          ? <ThreadsList list={peopleList} activeChannelId={activeChannelId} type={'people'}/>
          : null}
        {this.state.currentTab === channelsTab.id
          ? <ThreadsList list={channelsList} activeChannelId={activeChannelId} type={'channels'}/>
          : null}
      </div>
    );
  }
}
