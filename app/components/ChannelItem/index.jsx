import React from 'react';
import {Map} from 'immutable';
import './styles.scss';
import cx from 'classnames';

export default class ChannelItem extends React.Component {
  static propTypes = {
    item: React.PropTypes.instanceOf(Map),
    isCurrent: React.PropTypes.bool,
    key: React.PropTypes.number,
    setCurrentChannel: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.item.get('id'),
    };
  }

  shouldComponentUpdate(nextProps) {
    return  nextProps.isCurrent !== this.props.isCurrent ||
            nextProps.item !== this.props.item;
  }

  setChannel = () => {
    this.props.setCurrentChannel(this.state.id);
  }

  render() {
    const unreadCounter = (() => {
      if (this.props.item.get('unreadMessagesCount')) {
        return (
          <span className='threads-list__unread-messages'>
            {this.props.item.get('unreadMessagesCount')}
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
      {this.props.item.get('name')}
      {unreadCounter}
      </div>
    );
  }
}
