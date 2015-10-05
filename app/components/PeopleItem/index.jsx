import React, {PropTypes} from 'react';
import Immutable, {Map} from 'immutable';
import cx from 'classnames';
import UnreadCounter from 'components/UnreadCounter';
import './styles.scss';

export default class PeopleItem extends React.Component {
  static propTypes = {
    item: PropTypes.instanceOf(Map),
    lastMessage: PropTypes.instanceOf(Map),
    setCurrentChannel: PropTypes.func.isRequired,
    isCurrent: PropTypes.bool,
    isOnline: PropTypes.bool,
  };


  shouldComponentUpdate(nextProps) {
    return !(
      Immutable.is(nextProps.isOnline, this.props.isOnline) &&
      Immutable.is(nextProps.isCurrent, this.props.isCurrent) &&
      Immutable.is(nextProps.lastMessage, this.props.lastMessage) &&
      Immutable.is(nextProps.item, this.props.item)
    );
  }


  setChannel = () => {
    this.props.setCurrentChannel(this.state.id);
  }


  render() {
    return (
      <div
        className={cx('person', {
          'person_active': this.props.isCurrent,
        })}
        onClick={this.setChannel}
      >
        <div className='person__name'>{this.props.item.get('name')}</div>
        <div className='person__last-message'>
          {this.props.lastMessage ? this.props.lastMessage.get('text') : '🙊'}
        </div>
        <UnreadCounter
          className='person__unread-counter'
          count={this.props.item.get('unreadMessagesCount')}
        />
      </div>
    );
  }
}
