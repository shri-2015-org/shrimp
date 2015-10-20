import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import cx from 'classnames';

import Star from 'components/Star';

import './styles.scss';


export default class ChannelHeader extends React.Component {

  static propTypes = {
    currentChannel: PropTypes.instanceOf(Map).isRequired,
  }


  render() {
    const channel = (this.props.currentChannel.get('isDirect')
      ? <div className='channel-header__person-name'>
      <div className={cx('channel-header__person-status', {
        'channel-header__person-status-offline': !this.props.currentChannel.get('isOnline'),
      })}></div>
          {this.props.currentChannel.get('name')}
    </div>
      : <div className='channel-header__channel-name'>
      <Star
        fill={this.props.currentChannel.get('isFavorite')}
        className={cx('channel-header__channel-star')}
      />
          {this.props.currentChannel.get('name')}
    </div>);

    return (
      <div className='channel-header'>
        {this.props.currentChannel.size
          ? channel
          : null}
      </div>
    );
  }
}
