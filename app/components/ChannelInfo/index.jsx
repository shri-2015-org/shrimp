import React, {PropTypes} from 'react';
import {Map, List} from 'immutable';
import GeminiScrollbar from 'react-gemini-scrollbar';

import PinnedMessages from 'components/PinnedMessages';
import JoinedUsers from 'components/JoinedUsers';
import UserInfo from 'components/UserInfo';

import './styles.scss';

export default class ChannelInfo extends React.Component {
  static propTypes = {
    pinnedMessages: PropTypes.instanceOf(List).isRequired,
    currentChannel: PropTypes.instanceOf(Map).isRequired,
    unpinMessage: PropTypes.func.isRequired,
    joinedUsers: PropTypes.instanceOf(List).isRequired,
    changeToDirectChannel: PropTypes.func.isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
  }


  render() {
    const {pinnedMessages, currentChannel, unpinMessage} = this.props;

    const pinnedMessagesBlock = (pinnedMessages.size)
      ? <PinnedMessages
          pinnedMessages={pinnedMessages}
          containerClass='channel-info__section'
          unpinMessage={unpinMessage} />
      : null;

    const currentChannelName = (currentChannel)
      ? currentChannel.get('name')
      : null;

    const usersJoined = (!currentChannel.get('isDirect'))
      ? <JoinedUsers
          {...this.props}
          containerClass='channel-info__section'/>
      : null;

    const userInfo = currentChannel.get('isDirect')
      ? <UserInfo currentChannel={currentChannel}/>
      : null;


    return (
      <div className='channel-info'>
        <div className='channel-info__inner'>
          <div className='channel-info__name'>
            About&nbsp;
            <div className='channel-info__name__same'>
              {currentChannelName}
            </div>
          </div>
          <GeminiScrollbar className='gm-scrollbar-container '>
            {userInfo}
            {pinnedMessagesBlock}
            {usersJoined}
          </GeminiScrollbar>
        </div>
      </div>
    );
  }
}
