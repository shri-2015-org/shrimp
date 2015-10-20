import React, {PropTypes} from 'react';
import {Map, List} from 'immutable';

import PinnedMessages from 'components/PinnedMessages';

import './styles.scss';

export default class ChannelInfo extends React.Component {
  static propTypes = {
    pinnedMessages: PropTypes.instanceOf(List).isRequired,
    currentChannel: PropTypes.instanceOf(Map).isRequired,
  }

  render() {
    const {pinnedMessages, currentChannel} = this.props;

    const pinnedMessagesBlock = (pinnedMessages.size)
      ? <PinnedMessages
          pinnedMessages={pinnedMessages}
          containerClass='channel-info__section'

    />
      : null;

    const currentChannelName = (currentChannel)
      ? currentChannel.get('name')
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
          {pinnedMessagesBlock}
        </div>
      </div>
    );
  }
}
