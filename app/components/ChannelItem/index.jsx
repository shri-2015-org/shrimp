import React, {PropTypes} from 'react';
import Immutable, {Map} from 'immutable';
import cx from 'classnames';
import Star from 'components/Star';
import UnreadCounter from 'components/UnreadCounter';
import './styles.scss';

export default class ChannelItem extends React.Component {

  static propTypes = {
    item: PropTypes.instanceOf(Map),
    lastMessage: PropTypes.instanceOf(Map),
    unreadCount: PropTypes.integer,
    isCurrent: PropTypes.bool,
    setFavoriteChannel: PropTypes.func.isRequired,
    setCurrentChannel: PropTypes.func.isRequired,
    joinToChannel: PropTypes.func.isRequired,
    markChannelAsRead: PropTypes.func.isRequired,
    favorite: PropTypes.bool,
    local: PropTypes.instanceOf(Map).isRequired,
  }


  constructor(props) {
    super(props);
    const channelId = this.props.item.get('id');
    this.state = {
      favorite: !!this.props.local.get('favoritesChannels').find(id => id === channelId),
    };
  }


  shouldComponentUpdate(nextProps, nextState) {
    return !(
      Immutable.is(nextProps.isCurrent, this.props.isCurrent) &&
      Immutable.is(nextProps.lastMessage, this.props.lastMessage) &&
      Immutable.is(nextProps.item, this.props.item) &&
      nextState.favorite === this.state.favorite
    );
  }


  setChannel = () => {
    this.props.setCurrentChannel(this.props.item.get('id'));
    const joinedUser = this.props.item.get('joined');
    if (!joinedUser) {
      this.props.joinToChannel(this.props.item.get('id'));
    }
    // When switching channels, mark both current and next channels as read
    this.props.markChannelAsRead({ channelId: this.props.local.get('currentChannelId'), lastSeen: new Date().toUTCString() });
    this.props.markChannelAsRead({ channelId: this.props.item.get('id'), lastSeen: new Date().toUTCString() });
  }


  toggleFavorite = e => {
    this.props.setFavoriteChannel(this.props.item.get('id'), !this.state.favorite);
    e.stopPropagation();
    this.setState({
      favorite: !this.state.favorite,
    });
  }


  render() {
    const {item, lastMessage} = this.props;
    // Don't show unread count for current channel
    const unreadCount = this.props.isCurrent || this.props.unreadCount === 0 ? null : this.props.unreadCount;
    return (
      <div
        className={cx('channel', {
          'channel_active': this.props.isCurrent,
        })}
        onClick={this.setChannel}
      >
        <Star
          fill={this.state.favorite}
          onClick={this.toggleFavorite}
          className={cx('channel__star', {
            channel__star_filled: this.state.favorite,
          })}
        />
        <div className='channel__name'>{item.get('name')}</div>
        <div className='channel__last-message'>
          {lastMessage ? lastMessage.get('text') : '🙊'}
        </div>
        <UnreadCounter
          className='channel__unread-counter'
          count={unreadCount}
        />
      </div>
    );
  }
}
