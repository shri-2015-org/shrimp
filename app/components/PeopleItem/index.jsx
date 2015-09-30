import React, {PropTypes} from 'react';
import Immutable, {Map} from 'immutable';
import './styles.scss';
import cx from 'classnames';

export default class PeopleItem extends React.Component {
  static propTypes = {
    item: PropTypes.instanceOf(Map),
    isOnline: PropTypes.bool,
    currentChannelId: PropTypes.string.isRequired,
    setCurrentDirectChannel: PropTypes.func.isRequired,
    isCurrent: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return !(
      Immutable.is(nextProps.isOnline, this.props.isOnline) &&
      Immutable.is(nextProps.item, this.props.item) &&
      Immutable.is(nextProps.currentChannelId, this.props.currentChannelId)
    );
  }

  setChannel = () => {
    this.props.setCurrentDirectChannel(this.props.item.get('id'));
  }

  render() {
    const unreadCounter = (() => {
      if (this.props.item.get('unreadMessagesCount')) {
        return (
          <span className='threads-list__unreaded-messages'>
            {this.props.item.get('unreadMessagesCount')}
          </span>
        );
      }
    }());

    return (
      <div
        className={cx('people-item', {
          'people-item_offline': this.props.isOnline,
          'people-item_active': this.props.isCurrent,
        })}
        onClick={this.setChannel}>
        <span className='people-item__avatar'></span>
        {this.props.item.get('nick')}
        {unreadCounter}
      </div>
    );
  }
}
