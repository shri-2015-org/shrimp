import React from 'react';
import './styles.scss';

export default class ThreadsList extends React.Component {
  static propTypes = {
    item: React.PropTypes.object,
    isCurrent: React.PropTypes.bool,
    key: React.PropTypes.number,
  }

  render() {
    return (
      <div className={this.props.isCurrent ? 'threads-list__channel-item_active' : 'threads-list__channel-item'}>
      {this.props.item.name}
      {this.props.item.unreadMessagesCount
        ? <span className='threads-list__unreaded-messages'>{this.props.item.unreadMessagesCount}</span>
        : null}
      </div>
    );
  }
}
