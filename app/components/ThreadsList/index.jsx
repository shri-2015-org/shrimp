import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import './styles.scss';
import ChannelItem from 'components/ChannelItem';
import PeopleItem from 'components/PeopleItem';


@connect(state => ({
  messages: state.messages,
}))
export default class ThreadsList extends React.Component {

  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    list: PropTypes.instanceOf(List),
    setCurrentChannel: PropTypes.func.isRequired,
    joinToChannel: PropTypes.func.isRequired,
    type: PropTypes.string,
    local: PropTypes.instanceOf(Map).isRequired,
  };


  render() {
    const list = (() => {
      switch (this.props.type) {
      case 'Channels':
        return this.props.list.map((listItem, index) => {
          const thisChannelId = listItem.get('id');
          const lastMessage = this.props.messages.findLast(m => m.get('channelId') === thisChannelId);

          return (
            <ChannelItem
              key={index}
              item={listItem}
              lastMessage={lastMessage}
              isCurrent={this.props.local.get('currentChannelId') === thisChannelId}
              setCurrentChannel={this.props.setCurrentChannel}
              joinToChannel={this.props.joinToChannel}
              local={this.props.local}
            />
          );
        });

      case 'People':
        return this.props.list.map((listItem, index) => {
          const thisChannelId = listItem.get('id');
          const lastMessage = this.props.messages.findLast(m => m.get('channelId') === thisChannelId);
          return (
            <PeopleItem
              key={index}
              item={listItem}
              lastMessage={lastMessage}
              isCurrent={this.props.local.get('currentChannelId') === thisChannelId}
              setCurrentChannel={this.props.setCurrentChannel}
            />
          );
        });

      default:
        return null;
      }
    }());

    return (
      <ul className='threads-list'>
        {list}
      </ul>
    );
  }
}
