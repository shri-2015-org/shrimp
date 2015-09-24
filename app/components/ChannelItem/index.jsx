import React from 'react';
import './styles.scss';
import cx from 'classnames';

export default class ChannelItem extends React.Component {
  static propTypes = {
    item: React.PropTypes.object,
    isCurrent: React.PropTypes.bool,
    key: React.PropTypes.number,
    setCurrentChannel: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.item.id,
    };
  }

  setChannel = () => {
    this.props.setCurrentChannel(this.state.id);
  }

  render() {
    const unreadCounter = (() => {
      if (this.props.item.unreadMessagesCount) {
        return (
          <span className='threads-list__unread-messages'>
            {this.props.item.unreadMessagesCount}
          </span>
        );
      }
    }());

    return (
      <div
        className={cx('threads-list__channel-item', {
          'threads-list__channel-item_active': this.props.isCurrent,
        })}
        onClick={this.setChannel}
      >
      {this.props.item.name}
      {unreadCounter}
      </div>
    );
  }
}
