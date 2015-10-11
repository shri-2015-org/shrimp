import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import './styles.scss';
import ChannelItem from 'components/ChannelItem';
import PeopleItem from 'components/PeopleItem';
import NewChannelItem from 'components/NewChannelItem';
import {Motion, spring} from 'react-motion';


@connect(state => ({
  messages: state.messages,
}))
export default class ThreadsList extends React.Component {

  static propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    channels: PropTypes.instanceOf(List).isRequired,
    list: PropTypes.instanceOf(List),
    setCurrentChannel: PropTypes.func.isRequired,
    joinToChannel: PropTypes.func.isRequired,
    replaceDirtyChannel: PropTypes.func.isRequired,
    newChannel: PropTypes.func.isRequired,
    type: PropTypes.string,
    local: PropTypes.instanceOf(Map).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      animated: false,
    };
  }


  componentDidMount() {
    setTimeout(this.setState.bind(this, {animated: true}), 1);
  }


  render() {
    const list = (() => {
      switch (this.props.type) {
      case 'Channels':
        const newChannelItem = interpolated => (
          <div style={{opacity: interpolated.x, transform: `translate(${interpolated.y}px, 0)`}}>
            <NewChannelItem
              replaceDirtyChannel={this.props.replaceDirtyChannel}
              newChannel={this.props.newChannel}
              channels={this.props.channels}
            />
          </div>
        );

        return this.props.list.map((listItem, index) => {
          if (listItem.get('isDirty')) {
            return (
              <Motion
                defaultStyle={{x: 0, y: 30}}
                style={{x: spring(this.state.animated ? 1 : 0), y: spring(this.state.animated ? 0 : 30)}}
                key={index}
              >
              {newChannelItem}
              </Motion>
            );
          }

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
