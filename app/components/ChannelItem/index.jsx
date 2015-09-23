import React from 'react';
import './styles.scss';

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
    return (
      <div className={this.props.isCurrent ? 'threads-list__channel-item_active' : 'threads-list__channel-item'} onClick={this.setChannel}>
      {this.props.item.name}
      {this.props.item.unreadMessagesCount
        ? <span className='threads-list__unreaded-messages'>{this.props.item.unreadMessagesCount}</span>
        : null}
      </div>
    );
  }
}
