import React, {PropTypes} from 'react';
import Immutable, {Map} from 'immutable';
import cx from 'classnames';
import UnreadCounter from 'components/UnreadCounter';
import './styles.scss';

export default class PeopleItem extends React.Component {
  static propTypes = {
    item: PropTypes.instanceOf(Map),
    lastMessage: PropTypes.instanceOf(Map),
    isCurrent: PropTypes.bool,
    isOnline: PropTypes.bool,
    currentChannelId: PropTypes.string.isRequired,
    setCurrentDirectChannel: PropTypes.func.isRequired,
  };


  shouldComponentUpdate(nextProps) {
    return !(
      Immutable.is(nextProps.isOnline, this.props.isOnline) &&
      Immutable.is(nextProps.isCurrent, this.props.isCurrent) &&
      Immutable.is(nextProps.lastMessage, this.props.lastMessage) &&
      Immutable.is(nextProps.item, this.props.item) &&
      Immutable.is(nextProps.currentChannelId, this.props.currentChannelId)
    );
  }


  setChannel = () => {
    this.props.setCurrentDirectChannel(this.props.item.get('id'));
  }


  render() {
    const {isCurrent, item, lastMessage, isOnline} = this.props;
    return (
      <div
        className={cx('person', {
          'person_active': isCurrent,
          'person_offline': !isOnline,
        })}
        onClick={this.setChannel}
      >
        <div className='person__name'>{item.get('name')}</div>
        <div className='person__last-message'>
          {lastMessage ? lastMessage.get('text') : '🙊'}
        </div>
        <UnreadCounter
          className='person__unread-counter'
          count={item.get('unreadMessagesCount')}
        />
      </div>
    );
  }
}
