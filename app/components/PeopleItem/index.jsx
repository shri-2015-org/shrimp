import React, {PropTypes} from 'react';
import './styles.scss';

export default class PeopleItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    isOnline: PropTypes.bool,
    key: React.PropTypes.number,
  };

  render() {
    const offline = this.props.isOnline ? '' : 'people-item_offline';
    return (
      <div className={'people-item ' + offline}>
        <span className='people-item__avatar'></span>
      {this.props.item.nick}
      {this.props.item.unreadMessagesCount
        ? <span className='threads-list__unreaded-messages'>{this.props.item.unreadMessagesCount}</span>
        : null}
      </div>
    );
  }
}
