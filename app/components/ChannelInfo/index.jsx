import React, {PropTypes} from 'react';
import {Map, List} from 'immutable';
import GeminiScrollbar from 'react-gemini-scrollbar';

import PinnedMessages from 'components/PinnedMessages';

import './styles.scss';

export default class ChannelInfo extends React.Component {
  static propTypes = {
    pinnedMessages: PropTypes.instanceOf(List).isRequired,
    currentChannel: PropTypes.instanceOf(Map).isRequired,
    unpinMessage: PropTypes.func.isRequired,
  }

  render() {
    const {pinnedMessages, currentChannel} = this.props;

    const pinnedMessagesBlock = (pinnedMessages.size)
      ? <PinnedMessages
          pinnedMessages={pinnedMessages}
          containerClass='channel-info__section'
          unpinMessage={this.props.unpinMessage}
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
          <GeminiScrollbar className='gm-scrollbar-container '>
            {pinnedMessagesBlock}
          </GeminiScrollbar>
        </div>
      </div>
    );
  }
}
