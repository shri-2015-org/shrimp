import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import cx from 'classnames';

import Star from 'components/Star';

import './styles.scss';


export default class ChannelHeader extends React.Component {

  static propTypes = {
    currentChannel: PropTypes.instanceOf(Map).isRequired,
    changeInfoSidebarStatus: PropTypes.func.isRequired,
  }

  toggleInfoSidebar = () => {
    this.props.changeInfoSidebarStatus('toggle');
  }

  render() {
    const {currentChannel} = this.props;
    const channel = (currentChannel.get('isDirect')
      ? <div className='channel-header__person-name'>
      <div className={cx('channel-header__person-status', {
        'channel-header__person-status-offline': !currentChannel.get('isOnline'),
      })}></div>
          {currentChannel.get('name')}
    </div>
      : <div className='channel-header__channel-name'>
      <Star
        fill={currentChannel.get('isFavorite')}
        className={cx('channel-header__channel-star')}
      />
          {currentChannel.get('name')}
    </div>);

    return (
      <div className='channel-header'>
        {currentChannel.size
          ? channel
          : null}

        <div className='info' onClick={this.toggleInfoSidebar}>
          <div className='info__icon'>i</div>
        </div>
      </div>
    );
  }
}
