import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import './styles.scss';

export default class PeopleItem extends React.Component {
  static propTypes = {
    item: PropTypes.instanceOf(Map),
    isOnline: PropTypes.bool,
  };

  shouldComponentUpdate(nextProps) {
    return  nextProps.isOnline !== this.props.isOnline ||
            nextProps.item !== this.props.item;
  }

  render() {
    const offline = this.props.isOnline ? '' : 'people-item_offline';

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
      <div className={'people-item ' + offline}>
        <span className='people-item__avatar'></span>
        {this.props.item.get('nick')}
        {unreadCounter}
      </div>
    );
  }
}
